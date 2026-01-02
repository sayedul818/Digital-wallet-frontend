import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, TrendingUp, Users, Activity, Eye, EyeOff, Wallet } from 'lucide-react';
import GuidedTour from '@/components/GuidedTour';
import { Step } from 'react-joyride';
import { useGetAgentTransactionsQuery, useGetBalanceQuery } from '@/store/api/walletApi';
import React, { useState } from 'react';

const AgentDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [showBalance, setShowBalance] = useState(true);

  // fetch agent transactions and compute stats
  const { data: txData, isLoading, error } = useGetAgentTransactionsQuery({ page: 1, limit: 20 });
  const { data: balanceData } = useGetBalanceQuery(undefined);

  const balance = balanceData?.balance ?? user?.balance ?? 0;
  const recentTransactions = txData?.transactions || [];

  const stats = React.useMemo(() => {
    const totalCashIn = (recentTransactions || []).filter((t: any) => t.type === 'cash-in').reduce((s: number, t: any) => s + (t.amount || 0), 0);
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
    return { totalCashIn, commission, transactionsToday };
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

        {/* Total Balance Card */}
        <Card className="balance-card border-0 shadow-card bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-primary-foreground/80 text-sm mb-1">Total Balance</p>
                <div className="flex items-center gap-2">
                  <h2 className="text-4xl font-bold">
                    {showBalance ? `$${balance.toFixed(2)}` : '••••••'}
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    {showBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </Button>
                </div>
              </div>
              <Wallet className="h-10 w-10 text-primary-foreground/80" />
            </div>
          </CardContent>
        </Card>

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
            {error && (
              <div className="text-center text-red-500 py-4 text-sm">
                Error loading transactions: {error?.data?.message || 'Unknown error'}
              </div>
            )}
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="text-center text-muted-foreground py-4">Loading transactions...</div>
              ) : recentTransactions && recentTransactions.length > 0 ? (
                <table className="w-full text-sm">
                  <thead className="border-b">
                    <tr className="text-left text-muted-foreground">
                      <th className="pb-2 font-medium">ID</th>
                      <th className="pb-2 font-medium">Date & Time</th>
                      <th className="pb-2 font-medium">Party</th>
                      <th className="pb-2 font-medium">Amount</th>
                      <th className="pb-2 font-medium">Type</th>
                      <th className="pb-2 font-medium">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentTransactions.map((txn: any) => (
                      <tr key={txn._id || txn.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 text-xs font-mono text-muted-foreground">
                          {(txn._id || txn.id)?.slice(-6) || 'N/A'}
                        </td>
                        <td className="py-3 text-xs">
                          {new Date(txn.createdAt).toLocaleString()}
                        </td>
                        <td className="py-3 font-medium">
                          {txn.sender?.name || txn.receiver?.name || 'N/A'}
                        </td>
                        <td className="py-3 font-semibold text-primary">
                          ${txn.amount?.toLocaleString() || '0.00'}
                        </td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            txn.type === 'cash-in' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'
                          }`}>
                            {txn.type || 'N/A'}
                          </span>
                        </td>
                        <td className="py-3 text-xs text-muted-foreground">
                          {txn.handledBy ? 'Handled' : 'Pending'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center text-muted-foreground py-4">
                  {isLoading ? 'Loading transactions...' : 'No transactions found'}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AgentDashboard;
