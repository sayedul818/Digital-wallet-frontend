import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useGetAgentTransactionsQuery } from '@/store/api/walletApi';
import { useState } from 'react';

const AgentTransactions = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [page, setPage] = useState(1);
  const limit = 20;

  const { data: txData, isLoading, error } = useGetAgentTransactionsQuery({ page, limit });
  const transactions = txData?.transactions || [];
  const totalPages = txData?.totalPages || 1;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Transactions</h1>
        <p className="text-muted-foreground">View all your agent transactions</p>
      </div>

      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="text-center text-red-500 py-4 text-sm mb-4">
              Error loading transactions: {(error as any)?.data?.message || (error as any)?.message || 'Unknown error'}
            </div>
          )}
          <div className="overflow-x-auto scrollbar-custom">
            {isLoading ? (
              <div className="text-center text-muted-foreground py-8">Loading transactions...</div>
            ) : transactions && transactions.length > 0 ? (
              <>
                <table className="w-full text-sm">
                  <thead className="border-b bg-muted/30">
                    <tr className="text-left text-muted-foreground">
                      <th className="px-4 py-3 font-medium">ID</th>
                      <th className="px-4 py-3 font-medium">Date & Time</th>
                      <th className="px-4 py-3 font-medium">Type</th>
                      <th className="px-4 py-3 font-medium">Party</th>
                      <th className="px-4 py-3 font-medium">Amount</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((txn: any) => (
                      <tr key={txn._id || txn.id} className="border-b hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-4 text-xs font-mono text-muted-foreground">
                          {(txn._id || txn.id)?.slice(-6) || 'N/A'}
                        </td>
                        <td className="px-4 py-4 text-xs whitespace-nowrap">
                          {new Date(txn.createdAt).toLocaleString()}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2">
                            {txn.type === 'cash-in' ? (
                              <ArrowDownLeft className="h-4 w-4 text-success" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4 text-primary" />
                            )}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              txn.type === 'cash-in' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'
                            }`}>
                              {txn.type || 'N/A'}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-4 font-medium">
                          {txn.sender?.name || txn.receiver?.name || 'N/A'}
                        </td>
                        <td className="px-4 py-4 font-semibold text-primary">
                          ${txn.amount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                        </td>
                        <td className="px-4 py-4 text-xs">
                          <span className={`px-3 py-1 rounded-full font-medium ${
                            txn.handledBy ? 'bg-success/10 text-success' : 'bg-yellow-500/10 text-yellow-600'
                          }`}>
                            {txn.handledBy ? 'Completed' : 'Pending'}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-xs text-muted-foreground max-w-xs truncate">
                          {txn.notes || txn.remarks || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Page {page} of {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="px-4 py-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center text-muted-foreground py-8">
                {isLoading ? 'Loading transactions...' : 'No transactions found'}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentTransactions;
