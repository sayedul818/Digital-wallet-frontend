import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowDownCircle, ArrowUpCircle, Check, X, Clock, Wallet } from 'lucide-react';
import { toast } from 'sonner';
import {
  Alert,
  AlertDescription,
} from '@/components/ui/alert';
import { useGetAgentRequestsQuery, useApproveMoneyRequestMutation, useRejectMoneyRequestMutation, useGetBalanceQuery } from '@/store/api/walletApi';

const AgentRequests = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  
  const { data: balanceData } = useGetBalanceQuery(undefined);
  const { data: requestsData, isLoading, refetch } = useGetAgentRequestsQuery({ 
    status: filter === 'all' ? undefined : filter,
    page: 1, 
    limit: 50 
  });
  
  const [approveRequest, { isLoading: isApproving }] = useApproveMoneyRequestMutation();
  const [rejectRequest, { isLoading: isRejecting }] = useRejectMoneyRequestMutation();

  const agentBalance = balanceData?.balance ?? user?.balance ?? 0;
  const requests = requestsData?.requests || [];
  const pendingCount = requests.filter((r: any) => r.status === 'pending').length;

  const handleApprove = async (requestId: string, type: string, amount: number) => {
    if (type === 'deposit' && amount > agentBalance) {
      toast.error('Insufficient agent balance to process this deposit');
      return;
    }

    try {
      await approveRequest(requestId).unwrap();
      toast.success(`${type === 'deposit' ? 'Deposit' : 'Withdrawal'} of $${amount} approved successfully`);
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to approve request');
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      await rejectRequest(requestId).unwrap();
      toast.info('Request rejected');
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to reject request');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Money Requests</h1>
          <p className="text-muted-foreground">Manage deposit and withdrawal requests from users</p>
        </div>
        <Badge variant="default" className="text-lg px-4 py-2">
          {pendingCount} Pending
        </Badge>
      </div>

      {/* Agent Balance Alert */}
      <Alert>
        <Wallet className="h-4 w-4" />
        <AlertDescription>
          Your current balance: <span className="font-bold">${agentBalance.toFixed(2)}</span>
        </AlertDescription>
      </Alert>

      {/* Filter Tabs */}
      <Card className="border-0 shadow-card">
        <CardContent className="pt-6">
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              size="sm"
            >
              All Requests
            </Button>
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              onClick={() => setFilter('pending')}
              size="sm"
            >
              Pending ({pendingCount})
            </Button>
            <Button
              variant={filter === 'approved' ? 'default' : 'outline'}
              onClick={() => setFilter('approved')}
              size="sm"
            >
              Approved
            </Button>
            <Button
              variant={filter === 'rejected' ? 'default' : 'outline'}
              onClick={() => setFilter('rejected')}
              size="sm"
            >
              Rejected
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <div className="space-y-4">
        {isLoading ? (
          <Card className="border-0 shadow-card">
            <CardContent className="py-12 text-center text-muted-foreground">
              Loading requests...
            </CardContent>
          </Card>
        ) : requests.length === 0 ? (
          <Card className="border-0 shadow-card">
            <CardContent className="py-12 text-center text-muted-foreground">
              No {filter !== 'all' ? filter : ''} requests found
            </CardContent>
          </Card>
        ) : (
          requests.map((request: any) => (
            <Card key={request._id} className="border-0 shadow-card">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Request Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                      request.type === 'deposit' 
                        ? 'bg-success/10' 
                        : 'bg-primary/10'
                    }`}>
                      {request.type === 'deposit' ? (
                        <ArrowDownCircle className="h-6 w-6 text-success" />
                      ) : (
                        <ArrowUpCircle className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{request.user?.name || 'Unknown User'}</h3>
                        <Badge variant="outline" className={
                          request.status === 'pending' 
                            ? 'bg-yellow-500/10 text-yellow-600'
                            : request.status === 'approved'
                            ? 'bg-success/10 text-success'
                            : 'bg-destructive/10 text-destructive'
                        }>
                          {request.status === 'pending' ? (
                            <><Clock className="h-3 w-3 mr-1" /> Pending</>
                          ) : request.status === 'approved' ? (
                            <><Check className="h-3 w-3 mr-1" /> Approved</>
                          ) : (
                            <><X className="h-3 w-3 mr-1" /> Rejected</>
                          )}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{request.user?.email || 'N/A'}</p>
                      <p className="text-xs text-muted-foreground">
                        Request ID: {request._id.slice(-6)} • {new Date(request.createdAt).toLocaleString()}
                      </p>
                      <div className="mt-2">
                        <Badge variant="outline" className={
                          request.type === 'deposit' 
                            ? 'bg-success/10 text-success'
                            : 'bg-primary/10 text-primary'
                        }>
                          {request.type === 'deposit' ? 'Deposit Request' : 'Withdrawal Request'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Amount and Actions */}
                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">
                        ${request.amount.toFixed(2)}
                      </p>
                      {request.type === 'deposit' && request.status === 'pending' && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Will deduct from your balance
                        </p>
                      )}
                      {request.type === 'withdraw' && request.status === 'pending' && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Will add to your balance
                        </p>
                      )}
                    </div>

                    {request.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleReject(request._id)}
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10"
                          disabled={isRejecting}
                        >
                          <X className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button
                          onClick={() => handleApprove(request._id, request.type, request.amount)}
                          size="sm"
                          className="bg-success hover:bg-success/90"
                          disabled={isApproving}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Info Card */}
      <Card className="border-0 shadow-card bg-primary/5">
        <CardHeader>
          <CardTitle className="text-base">How Requests Work</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-muted-foreground">
          <p><strong className="text-foreground">Deposit Requests:</strong> When you approve a deposit, the amount is deducted from your balance and added to the user's wallet.</p>
          <p><strong className="text-foreground">Withdrawal Requests:</strong> When you approve a withdrawal, the amount is deducted from the user's wallet and added to your balance.</p>
          <p><strong className="text-foreground">Balance Check:</strong> Ensure you have sufficient balance before approving deposit requests.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentRequests;
