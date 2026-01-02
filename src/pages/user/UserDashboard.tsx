import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetBalanceQuery, useGetTransactionsQuery } from '@/store/api/walletApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Wallet, ArrowUpCircle, ArrowDownCircle, Send, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import GuidedTour from '@/components/GuidedTour';
import { Step } from 'react-joyride';

const UserDashboard = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [showBalance, setShowBalance] = useState(true);

  const { data: balanceData } = useGetBalanceQuery(undefined);
  const { data: txData, isLoading: txLoading } = useGetTransactionsQuery({ page: 1, limit: 3 });

  const balance = balanceData?.balance ?? user?.balance ?? 0;
  const recentTransactions = txData?.transactions || [];

  const tourSteps: Step[] = [
    {
      target: '.dashboard-nav',
      content: 'Use this navigation to access different sections of your wallet',
      disableBeacon: true,
    },
    {
      target: '.balance-card',
      content: 'Your current wallet balance is displayed here',
    },
    {
      target: '.quick-actions',
      content: 'Quick action buttons for common transactions',
    },
    {
      target: '.recent-transactions',
      content: 'View your most recent transaction history here',
    },
    {
      target: '[data-theme-toggle]',
      content: 'Toggle between light and dark themes',
    },
  ];

  return (
    <>
      <GuidedTour steps={tourSteps} tourKey="user-dashboard" />
      
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">Manage your wallet and transactions</p>
        </div>

        {/* Balance Card */}
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

        {/* Quick Actions */}
        <div className="quick-actions grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/user/deposit">
            <Card className="border-0 shadow-card hover:shadow-lg transition-all cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-accent flex items-center justify-center">
                    <ArrowDownCircle className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Deposit Money</h3>
                    <p className="text-sm text-muted-foreground">Add funds via agent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/user/withdraw">
            <Card className="border-0 shadow-card hover:shadow-lg transition-all cursor-pointer h-full">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center">
                    <ArrowUpCircle className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Withdraw Money</h3>
                    <p className="text-sm text-muted-foreground">Cash out to bank</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/user/send">
            <Card className="border-0 shadow-card hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-accent flex items-center justify-center">
                    <Send className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Send Money</h3>
                    <p className="text-sm text-muted-foreground">Transfer to others</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Transactions */}
        <Card className="recent-transactions border-0 shadow-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Transactions</CardTitle>
            <Button variant="outline" size="sm" asChild>
              <Link to="/user/transactions">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {txLoading ? (
                <div className="text-center text-muted-foreground py-4">Loading recent transactions...</div>
              ) : recentTransactions.length > 0 ? (
                recentTransactions.map((transaction: any) => (
                  <div
                    key={transaction._id || transaction.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          transaction.amount > 0 ? 'bg-success/10' : 'bg-destructive/10'
                        }`}
                      >
                        {transaction.amount > 0 ? (
                          <ArrowDownCircle className="h-5 w-5 text-success" />
                        ) : (
                          <ArrowUpCircle className="h-5 w-5 text-destructive" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.type}</p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.sender?.name || transaction.receiver?.name} • {new Date(transaction.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <p
                      className={`font-semibold ${
                        transaction.amount > 0 ? 'text-success' : 'text-destructive'
                      }`}
                    >
                      {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount)}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-4">No recent transactions</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default UserDashboard;
