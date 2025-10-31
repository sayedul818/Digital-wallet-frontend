import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, Activity, DollarSign } from 'lucide-react';
import GuidedTour from '@/components/GuidedTour';
import { Step } from 'react-joyride';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useGetSystemStatsQuery, useGetAllTransactionsQuery } from '@/store/api/walletApi';
import { argv } from 'process';

const AdminDashboard = () => {
  // Fetch real overview stats and recent transactions from backend
  const { data: overview, isLoading: statsLoading } = useGetSystemStatsQuery(undefined);
  // Load recent transactions (fetch first page, limit 100 to compute chart)
  const { data: txResponse, isLoading: txLoading } = useGetAllTransactionsQuery({ page: 1, limit: 100 });

  const stats = {
    totalUsers: overview?.totalUsers ?? 0,
    totalAgents: overview?.totalAgents ?? 0,
    totalTransactions: overview?.totalTransactions ?? 0,
    transactionVolume: overview?.totalVolume ?? 0,
  };

  // Build last-7-days chart data from transactions
  const chartData = useMemo(() => {
    const txs = txResponse?.transactions || [];
    const today = new Date();
    // initialize last 7 days
    const days: { name: string; date: string; transactions: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      days.push({ name: d.toLocaleDateString(undefined, { weekday: 'short' }), date: key, transactions: 0 });
    }

    txs.forEach((tx: any) => {
      const created = new Date(tx.createdAt).toISOString().slice(0, 10);
      const day = days.find((d) => d.date === created);
      if (day) day.transactions += 1;
    });

    return days.map((d) => ({ name: d.name, transactions: d.transactions }));
  }, [txResponse]);

  // Recent activity derived from latest transactions
  const recentActivity = useMemo(() => {
    const txs = txResponse?.transactions || [];
    // take latest 6 entries
    return (txs.slice(0, 6) as any[]).map((tx) => ({
      id: tx._id || tx.id,
      action: `${tx.type?.replace('-', ' ') || 'Transaction'}: ${tx.status || ''}`.trim(),
      user: tx.sender?.name || tx.receiver?.name || '—',
      time: new Date(tx.createdAt).toLocaleString(),
    }));
  }, [txResponse]);

  const tourSteps: Step[] = [
    {
      target: '.dashboard-nav',
      content: 'Access all administrative functions from this navigation',
      disableBeacon: true,
    },
    {
      target: '.stats-cards',
      content: 'Monitor key system metrics at a glance',
    },
    {
      target: '.analytics-chart',
      content: 'Visualize transaction trends and patterns',
    },
    {
      target: '.activity-log',
      content: 'Track recent system activities and user actions',
    },
  ];

  return (
    <>
      <GuidedTour steps={tourSteps} tourKey="admin-dashboard" />

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">System overview and management</p>
        </div>

        {/* Stats */}
        <div className="stats-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAgents.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTransactions.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+23% from last month</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-card bg-gradient-primary text-primary-foreground">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transaction Volume</CardTitle>
              <DollarSign className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold ">
                  ${stats.transactionVolume.toLocaleString()}
                </div>
              <p className="text-xs opacity-80">+15% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="analytics-chart border-0 shadow-card">
          <CardHeader>
            <CardTitle>Transaction Trends (Last 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="transactions" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="activity-log border-0 shadow-card">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start justify-between p-4 rounded-lg bg-muted/50"
                >
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.user}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminDashboard;
