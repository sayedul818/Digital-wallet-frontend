import { useState } from 'react';
import { useGetTransactionsQuery } from '@/store/api/walletApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download } from 'lucide-react';

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isLoading, isError } = useGetTransactionsQuery({ page: currentPage, limit: itemsPerPage, type: typeFilter === 'all' ? undefined : typeFilter });

  const transactions = data?.transactions || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / itemsPerPage);
  const paginatedTransactions = transactions;

  const getStatusColor = (status: string) => {
    return status === 'Completed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning';
  };

  const getAmountColor = (amount: number) => {
    return amount > 0 ? 'text-success' : 'text-destructive';
  };

  const handleExportCSV = () => {
    if (transactions.length === 0) {
      alert('No transactions to export');
      return;
    }

    // CSV headers
    const headers = ['ID', 'Date & Time', 'Type', 'Amount', 'Status', 'Party', 'Remarks'];
    
    // CSV rows
    const rows = transactions.map((txn: any) => [
      txn._id || txn.id || 'N/A',
      new Date(txn.createdAt).toLocaleString(),
      txn.type || 'N/A',
      txn.amount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00',
      txn.status || 'Completed',
      txn.sender?.name || txn.receiver?.name || txn.party || 'N/A',
      txn.notes || txn.remarks || '-'
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map((cell: any) => `"${cell}"`).join(','))
    ].join('\n');

    // Create blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Transaction History</h1>
        <p className="text-muted-foreground">View and manage all your transactions</p>
      </div>

      <Card className="border-0 shadow-card">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <CardTitle>All Transactions</CardTitle>
            <Button variant="outline" size="sm" onClick={handleExportCSV}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ID or party..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="withdraw">Withdraw</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border overflow-x-auto scrollbar-custom">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Party</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Loading transactions...
                    </TableCell>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      Error loading transactions. Please try again.
                    </TableCell>
                  </TableRow>
                ) : paginatedTransactions.length > 0 ? (
                  paginatedTransactions.map((txn: any) => (
                    <TableRow key={txn._id || txn.id}>
                      <TableCell className="font-medium text-xs font-mono text-muted-foreground">
                        {(txn._id || txn.id)?.slice(-6) || 'N/A'}
                      </TableCell>
                      <TableCell className="text-xs whitespace-nowrap">
                        {new Date(txn.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={txn.type === 'received' || txn.type === 'deposit' ? 'bg-success/10 text-success' : 'bg-primary/10 text-primary'}>
                          {txn.type || 'N/A'}
                        </Badge>
                      </TableCell>
                      <TableCell className={`font-semibold ${getAmountColor(txn.amount)}`}>
                        ${txn.amount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={getStatusColor(txn.status || 'Completed')}>
                          {txn.status || 'Completed'}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {txn.sender?.name || txn.receiver?.name || txn.party || 'N/A'}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-xs max-w-xs truncate">
                        {txn.notes || txn.remarks || '-'}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No transactions found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, total)} of{' '}
                {total} transactions
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
