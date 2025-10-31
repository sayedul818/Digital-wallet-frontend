import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, Users, Activity } from 'lucide-react';
import GuidedTour from '@/components/GuidedTour';
import { Step } from 'react-joyride';
import { useGetAgentTransactionsQuery } from '@/store/api/walletApi';
import React from 'react';

const AgentDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  // fetch agent transactions and compute stats
  const { data: txData, isLoading } = useGetAgentTransactionsQuery({ page: 1, limit: 20 });

  const recentTransactions = txData?.transactions || [];

  const stats = React.useMemo(() => {
    const totalCashIn = (recentTransactions || []).filter((t: any) => t.type === 'cash-in').reduce((s: number, t: any) => s + (t.amount || 0), 0);
    const totalCashOut = (recentTransactions || []).filter((t: any) => t.type === 'cash-out').reduce((s: number, t: any) => s + (t.amount || 0), 0);
    // Compute commission from transactions (assumes fixed 3% commission rate)
    const commissionRate = 0.03;
    const commission = (recentTransactions || []).reduce((sum: number, t: any) => {
      const amt = t.amount || 0;
      // Only count transactions that the agent handled
      if (t.handledBy) {
        return sum + amt * commissionRate;
      }
      return sum;
    }, 0);
    const transactionsToday = (recentTransactions || []).filter((t: any) => new Date(t.createdAt).toDateString() === new Date().toDateString()).length;
    return { totalCashIn, totalCashOut, commission, transactionsToday };
  }, [recentTransactions]);

  const tourSteps: Step[] = [
    {
      target: '.dashboard-nav',
      content: 'Navigate between different sections of your agent portal',
      disableBeacon: true,
    },
    {
      target: '.stats-overview',
      content: 'View your commission earnings and transaction summary',
    },
    {
      target: '.recent-activity',
      content: 'Monitor your recent cash-in and cash-out transactions',
    },
  ];

  return (
    <>
      <GuidedTour steps={tourSteps} tourKey="agent-dashboard" />

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Agent Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>

        {/* Stats */}
        <div className="stats-overview grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cash In</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalCashIn.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All time deposits</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cash Out</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalCashOut.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">All time withdrawals</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-accent text-accent-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commission Earned</CardTitle>
              <TrendingUp className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.commission.toLocaleString()}</div>
              <p className="text-xs opacity-80">Total earnings</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Transactions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.transactionsToday}</div>
              <p className="text-xs text-muted-foreground">Handled today</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="recent-activity border-0 shadow-card">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {isLoading ? (
                <div className="text-center text-muted-foreground py-4">Loading transactions...</div>
              ) : recentTransactions.length > 0 ? (
                recentTransactions.map((txn: any) => (
                  <div
                    key={txn._id || txn.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          txn.type === 'cash-in' ? 'bg-success/10' : 'bg-primary/10'
                        }`}
                      >
                        <DollarSign
                          className={`h-5 w-5 ${
                            txn.type === 'cash-in' ? 'text-success' : 'text-primary'
                          }`}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{txn.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {txn.sender?.name || txn.receiver?.name} • {new Date(txn.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${txn.amount}</p>
                      <p className="text-sm text-success">+{txn.handledBy ? 'handled' : ''}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-4">No transactions found</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AgentDashboard;
