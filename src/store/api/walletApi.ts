import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
type Agent = any;

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const walletApi = createApi({
  reducerPath: 'walletApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Transaction', 'Agent', 'Admin'],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    // User endpoints
    getBalance: builder.query({
      // GET /api/users/me/wallet
      query: () => '/users/me/wallet',
      providesTags: (result, error, arg) => [{ type: 'User', id: 'SELF' }],
    }),
    getTransactions: builder.query({
      // GET /api/users/transactions
      query: ({ page = 1, limit = 10, type, dateFrom, dateTo }: any) => ({
        url: '/users/transactions',
        params: { page, limit, type, dateFrom, dateTo },
      }),
      providesTags: (result) => [
        { type: 'Transaction', id: 'SELF' },
        ...(result?.transactions || []).map((tx: any) => ({
          type: 'Transaction' as const,
          id: tx.sender === tx.receiver ? 'SELF' : (tx.sender === 'SELF' ? tx.receiver : tx.sender)
        }))
      ],
    }),
    sendMoney: builder.mutation({
      // POST /api/users/send
      query: (data) => ({
        url: '/users/send',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { receiverPhone }) => [
        // Invalidate sender's data (self)
        { type: 'User', id: 'SELF' },
        { type: 'Transaction', id: 'SELF' },
        // Invalidate receiver's data
        { type: 'User', id: receiverPhone },
        { type: 'Transaction', id: receiverPhone }
      ],
    }),
    // Agent endpoints
    agentCashIn: builder.mutation({
      // POST /api/agents/cash-in
      query: (data) => ({
        url: '/agents/cash-in',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { userPhone }) => [
        // Invalidate agent's data (self)
        { type: 'User', id: 'SELF' },
        { type: 'Transaction', id: 'SELF' },
        { type: 'Agent', id: 'SELF' },
        // Invalidate target user's data
        { type: 'User', id: userPhone },
        { type: 'Transaction', id: userPhone }
      ],
    }),
    agentCashOut: builder.mutation({
      // POST /api/agents/cash-out
      query: (data) => ({
        url: '/agents/cash-out',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { userPhone }) => [
        // Invalidate agent's data (self)
        { type: 'User', id: 'SELF' },
        { type: 'Transaction', id: 'SELF' },
        { type: 'Agent', id: 'SELF' },
        // Invalidate target user's data
        { type: 'User', id: userPhone },
        { type: 'Transaction', id: userPhone }
      ],
    }),
    // Search users (GET /api/users/search?search=...)
    searchUsers: builder.query({
      query: ({ search = '', limit = 10 }: any) => ({
        url: '/users/search',
        params: { search, limit },
      }),
      providesTags: ['User'],
    }),
    // Admin endpoints
    getAllUsers: builder.query({
      query: ({ page = 1, search = '', role }: any) => ({
        url: '/admin/users',
        params: { page, search, role },
      }),
      providesTags: (result) => [
        // Tag the list itself
        { type: 'Admin', id: 'USER_LIST' },
        // Tag each user individually
        ...(result?.users || []).map((user: any) => ({
          type: user.role === 'agent' ? 'Agent' : 'User' as const,
          id: user._id || user.id
        }))
      ],
    }),
    getAllAgents: builder.query({
      query: ({ page = 1 }: any) => ({
        url: '/admin/users',
        params: { page, role: 'agent' },
      }),
      providesTags: (result) => [
        // Tag the list itself
        { type: 'Admin', id: 'AGENT_LIST' },
        // Tag each agent individually
        ...(result?.users || []).map((agent: any) => ({
          type: 'Agent' as const,
          id: agent._id || agent.id
        }))
      ],
    }),
    updateUserStatus: builder.mutation({
      query: ({ userId, isActive }: any) => ({
        url: `/admin/users/${userId}/status`,
        method: 'PATCH',
        body: { isActive },
      }),
      invalidatesTags: (result, error, { userId }) => [
        // Invalidate the specific user/agent
        { type: 'User', id: userId },
        { type: 'Agent', id: userId },
        // Invalidate both lists since status changed
        { type: 'Admin', id: 'USER_LIST' },
        { type: 'Admin', id: 'AGENT_LIST' }
      ],
    }),
    adminCredit: builder.mutation({
      query: ({ userId, amount }: any) => ({
        url: `/admin/users/${userId}/credit`,
        method: 'POST',
        body: { amount },
      }),
      invalidatesTags: (result, error, { userId }) => [
        // Invalidate just this user's data
        { type: 'User', id: userId },
        { type: 'Agent', id: userId },
        { type: 'Transaction', id: userId },
        // Refresh lists to show new balance
        { type: 'Admin', id: 'USER_LIST' },
        { type: 'Admin', id: 'AGENT_LIST' }
      ],
    }),
    approveAgent: builder.mutation({
      query: ({ agentId }: any) => ({
        url: `/admin/agents/${agentId}/approve`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, { agentId }) => [
        // Invalidate just this agent
        { type: 'Agent', id: agentId },
        // Refresh agent list
        { type: 'Admin', id: 'AGENT_LIST' }
      ],
    }),
    getAllTransactions: builder.query({
      query: ({ page = 1, limit = 10, type, status }: any) => ({
        url: '/admin/transactions',
        params: { page, limit, type, status },
      }),
      providesTags: (result) => [
        // Tag the list itself
        { type: 'Admin', id: 'TX_LIST' },
        // Tag each transaction's participants
        ...(result?.transactions || []).flatMap((tx: any) => [
          { type: 'Transaction', id: tx.sender?._id || tx.sender?.id },
          { type: 'Transaction', id: tx.receiver?._id || tx.receiver?.id }
        ])
      ],
    }),
    // Agent-specific transactions
    getAgentTransactions: builder.query({
      query: ({ page = 1, limit = 10 }: any) => ({
        url: '/agents/transactions',
        params: { page, limit },
      }),
      providesTags: (result) => [
        { type: 'Transaction', id: 'SELF' },
        { type: 'Agent', id: 'SELF' }
      ],
    }),
    getSystemStats: builder.query({
      // GET /api/admin/overview
      query: () => '/admin/overview',
      providesTags: [{ type: 'Admin', id: 'STATS' }],
    }),
    // Money Request endpoints
    createMoneyRequest: builder.mutation({
      query: (data) => ({
        url: '/users/requests',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'User', id: 'SELF' }],
    }),
    getUserRequests: builder.query({
      query: ({ status, page = 1, limit = 10 }: any) => ({
        url: '/users/requests',
        params: { status, page, limit },
      }),
      providesTags: [{ type: 'User', id: 'SELF' }],
    }),
    getAgentRequests: builder.query({
      query: ({ status, page = 1, limit = 20 }: any) => ({
        url: '/agents/requests',
        params: { status, page, limit },
      }),
      providesTags: [{ type: 'Agent', id: 'SELF' }],
    }),
    approveMoneyRequest: builder.mutation({
      query: (requestId: string) => ({
        url: `/agents/requests/${requestId}/approve`,
        method: 'PATCH',
      }),
      invalidatesTags: [
        { type: 'Agent', id: 'SELF' },
        { type: 'User', id: 'SELF' },
        { type: 'Transaction', id: 'SELF' },
      ],
    }),
    rejectMoneyRequest: builder.mutation({
      query: (requestId: string) => ({
        url: `/agents/requests/${requestId}/reject`,
        method: 'PATCH',
      }),
      invalidatesTags: [{ type: 'Agent', id: 'SELF' }],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetBalanceQuery,
  useGetTransactionsQuery,
  useSendMoneyMutation,
  useAgentCashInMutation,
  useAgentCashOutMutation,
  useSearchUsersQuery,
  useGetAllUsersQuery,
  useGetAllAgentsQuery,
  useUpdateUserStatusMutation,
  useAdminCreditMutation,
  useApproveAgentMutation,
  useGetSystemStatsQuery,
  useGetAllTransactionsQuery,
  useGetAgentTransactionsQuery,
  useCreateMoneyRequestMutation,
  useGetUserRequestsQuery,
  useGetAgentRequestsQuery,
  useApproveMoneyRequestMutation,
  useRejectMoneyRequestMutation,
} = walletApi;
