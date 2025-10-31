import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'user' | 'agent' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  balance?: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Helper to load initial state from localStorage
const loadInitialState = (): AuthState => {
  const token = localStorage.getItem('token');
  const savedUser = localStorage.getItem('user');
  let user: User | null = null;
  
  try {
    user = savedUser ? JSON.parse(savedUser) : null;
  } catch (e) {
    localStorage.removeItem('user'); // Clear invalid data
  }

  return {
    user,
    token,
    isAuthenticated: !!token && !!user,
  };
};

const initialState: AuthState = loadInitialState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      // Save both token and user data
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      // Clear both token and user data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        const updatedUser = { ...state.user, ...action.payload };
        state.user = updatedUser;
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
    },
  },
});

export const { setCredentials, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
