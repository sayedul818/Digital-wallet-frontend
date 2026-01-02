import { useState } from 'react';
import {
  useGetAllUsersQuery,
  useApproveAgentMutation,
  useUpdateUserStatusMutation,
  useAdminCreditMutation,
} from '@/store/api/walletApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, CheckCircle, Ban } from 'lucide-react';
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

const Agents = () => {
  const [searchQuery, setSearchQuery] = useState('');  const [page] = useState(1);  const { data, isLoading, isError, refetch } = useGetAllUsersQuery({ page, search: searchQuery, role: 'agent' });
  const [approveAgent, { isLoading: isApproving }] = useApproveAgentMutation();
  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [selectedAgent, setSelectedAgent] = useState<any>(null);
  const [actionType, setActionType] = useState<'block' | 'unblock' | null>(null);
  const [creditTarget, setCreditTarget] = useState<any>(null);
  const [creditAmount, setCreditAmount] = useState<string>('');
  const [crediting, setCrediting] = useState(false);
  const [adminCredit] = useAdminCreditMutation();

  const agents = data?.users || [];

  const handleApprove = async (agent: any) => {
    try {
      await approveAgent({ agentId: agent._id || agent.id }).unwrap();
      toast.success(`Agent ${agent.name} approved`);
      refetch();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || 'Approve failed');
    }
  };

  const handleAction = (agent: any, action: 'block' | 'unblock') => {
    setSelectedAgent(agent);
    setActionType(action);
  };

  const confirmAction = async () => {
    if (!selectedAgent || !actionType) return;
    try {
      await updateUserStatus({ userId: selectedAgent._id || selectedAgent.id, isActive: actionType === 'unblock' }).unwrap();
      toast.success(`${selectedAgent.name} has been ${actionType === 'block' ? 'blocked' : 'unblocked'}`);
      refetch();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || 'Action failed');
    }
    setSelectedAgent(null);
    setActionType(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Agent Management</h1>
        <p className="text-muted-foreground">Manage agent accounts and approvals</p>
      </div>

      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>All Agents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agents by name, email or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="rounded-lg border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead>Approved</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Loading agents...
                    </TableCell>
                  </TableRow>
                ) : isError ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      Error loading agents
                    </TableCell>
                  </TableRow>
                ) : agents.length > 0 ? (
                  agents.map((agent: any) => (
                    <TableRow key={agent._id || agent.id}>
                      <TableCell className="font-medium">{agent.name}</TableCell>
                      <TableCell>{agent.email}</TableCell>
                      <TableCell>{agent.phone}</TableCell>
                      <TableCell>${agent.balance?.toLocaleString?.() ?? 0}</TableCell>
                      <TableCell>{agent.isApproved ? 'Yes' : 'No'}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={agent.isActive ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}>
                          {agent.isActive ? 'active' : 'blocked'}
                        </Badge>
                      </TableCell>
                      <TableCell>{agent.joinDate || agent.createdAt}</TableCell>
                      <TableCell className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => { setCreditTarget(agent); setCreditAmount(''); }}>
                          Credit
                        </Button>
                        {!agent.isApproved && (
                          <Button variant="secondary" size="sm" onClick={() => handleApprove(agent)} disabled={isApproving}>
                            <CheckCircle className="mr-1 h-3 w-3" /> Approve
                          </Button>
                        )}
                        {agent.isActive ? (
                          <Button variant="destructive" size="sm" onClick={() => handleAction(agent, 'block')}>
                            <Ban className="mr-1 h-3 w-3" /> Block
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm" onClick={() => handleAction(agent, 'unblock')}>
                            <CheckCircle className="mr-1 h-3 w-3" /> Unblock
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No agents found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <AlertDialog open={!!selectedAgent} onOpenChange={() => setSelectedAgent(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{actionType === 'block' ? 'Block Agent' : 'Unblock Agent'}</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {actionType} <strong>{selectedAgent?.name}</strong>?
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
            <AlertDialogTitle>Credit Agent</AlertDialogTitle>
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

export default Agents;
