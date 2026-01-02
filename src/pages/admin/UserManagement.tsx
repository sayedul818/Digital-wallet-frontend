import { useState } from 'react';
import { useGetAllUsersQuery, useUpdateUserStatusMutation, useAdminCreditMutation } from '@/store/api/walletApi';
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
import { Search, Ban, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const UserManagement = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [actionType, setActionType] = useState<'block' | 'unblock' | null>(null);
  const [creditTarget, setCreditTarget] = useState<any>(null);
  const [creditAmount, setCreditAmount] = useState<string>('');
  const [crediting, setCrediting] = useState(false);
  const [adminCredit] = useAdminCreditMutation();

  // live users from API - filter by role 'user' only
  const { data, isLoading, isError, refetch } = useGetAllUsersQuery({ page: currentPage, search: searchQuery, role: 'user' });
  const [updateUserStatus] = useUpdateUserStatusMutation();

  const users = data?.users || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / itemsPerPage);
  
  const filteredUsers = users.filter((user: any) => {
    const matchesStatus = statusFilter === 'all' || (user.isActive ? 'active' : 'blocked') === statusFilter;
    return matchesStatus;
  });

  const handleAction = (user: any, action: 'block' | 'unblock') => {
    setSelectedUser(user);
    setActionType(action);
  };

  const confirmAction = async () => {
    if (!selectedUser || !actionType) return;

    try {
      await updateUserStatus({ userId: selectedUser._id || selectedUser.id, isActive: actionType === 'unblock' });
      toast.success(
        `User ${selectedUser.name} has been ${actionType === 'block' ? 'blocked' : 'unblocked'}`
      );
      refetch();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || 'Action failed');
    }

    setSelectedUser(null);
    setActionType(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">User Management</h1>
        <p className="text-muted-foreground">Manage all registered users</p>
      </div>

      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-lg border overflow-x-auto scrollbar-custom">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Approved</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id || user._id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                      <TableCell>${user.balance.toLocaleString()}</TableCell>
                      <TableCell className="capitalize">{user.role}</TableCell>
                      <TableCell>{user.isApproved ? 'Yes' : 'No'}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            (user.isActive || user.status === 'active')
                              ? 'bg-success/10 text-success'
                              : 'bg-destructive/10 text-destructive'
                          }
                        >
                          {(user.isActive && 'active') || user.status || (user.isActive ? 'active' : 'blocked')}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.joinDate || user.createdAt}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => { setCreditTarget(user); setCreditAmount(''); }}>
                          Credit
                        </Button>
                        {((user.isActive || user.status === 'active') ? (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleAction(user, 'block')}
                          >
                            <Ban className="mr-1 h-3 w-3" />
                            Block
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAction(user, 'unblock')}
                          >
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Unblock
                          </Button>
                        ))}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                      No users found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, total)} of{' '}
                {total} users
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

      <AlertDialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === 'block' ? 'Block User' : 'Unblock User'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {actionType} <strong>{selectedUser?.name}</strong>?
              {actionType === 'block' &&
                ' They will not be able to access their account until unblocked.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmAction}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={!!creditTarget} onOpenChange={() => setCreditTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Credit Account</AlertDialogTitle>
            <AlertDialogDescription>
              Enter amount to credit <strong>{creditTarget?.name}</strong>'s account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="p-4">
            <Input
              placeholder="Amount"
              value={creditAmount}
              onChange={(e) => setCreditAmount(e.target.value)}
              type="number"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setCreditTarget(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={async () => {
              if (!creditTarget) return;
              const amt = Number(creditAmount);
              if (!amt || amt <= 0) { toast.error('Enter a valid amount'); return; }
              try {
                setCrediting(true);
                await adminCredit({ userId: creditTarget._id || creditTarget.id, amount: amt }).unwrap();
                toast.success(`Credited ${amt} to ${creditTarget.name}`);
                refetch();
                setCreditTarget(null);
              } catch (err: any) {
                console.error(err);
                toast.error(err?.data?.message || err?.message || 'Credit failed');
              } finally {
                setCrediting(false);
              }
            }}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagement;
