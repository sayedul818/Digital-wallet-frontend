import { useState } from 'react';
import { useSearchUsersQuery, useAgentCashInMutation } from '@/store/api/walletApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Search, DollarSign } from 'lucide-react';

const CashIn = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  const { data: searchResult, isLoading: searching } = useSearchUsersQuery({ search: searchQuery }, { skip: !searchQuery });
  const [agentCashIn] = useAgentCashInMutation();

  const filteredUsers = searchResult?.users || [];

  const handleCashIn = () => {
    const amountNum = parseFloat(amount);

    if (!selectedUser) {
      toast.error('Please select a user');
      return;
    }

    if (!amount || amountNum <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    (async () => {
      try {
        await agentCashIn({ userPhone: selectedUser.phone, amount: amountNum }).unwrap();
        const commission = amountNum * 0.03; // 3% commission
        toast.success(
          `Successfully added $${amount} to ${selectedUser.name}'s wallet. Commission: $${commission.toFixed(2)}`
        );
      } catch (err: any) {
        toast.error(err?.data?.message || err?.message || 'Cash in failed');
      }
    })();
    setSelectedUser(null);
    setAmount('');
    setNote('');
    setSearchQuery('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Cash In Service</h1>
        <p className="text-muted-foreground">Add money to user wallets</p>
      </div>

      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>Search User</CardTitle>
          <CardDescription>Find user by name, email, or phone number</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>

            {searchQuery && filteredUsers.length > 0 && (
              <div className="space-y-2">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedUser?.id === user.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-muted/50'
                    }`}
                  >
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.phone} • Balance: ${user.balance}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {selectedUser && (
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Cash In Details</CardTitle>
            <CardDescription>Adding money to {selectedUser.name}'s wallet</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              {amount && parseFloat(amount) > 0 && (
                <p className="text-sm text-success">
                  Commission: ${(parseFloat(amount) * 0.03).toFixed(2)}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Note (Optional)</Label>
              <Textarea
                id="note"
                placeholder="Transaction notes..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
              />
            </div>

            <Button onClick={handleCashIn} className="w-full" size="lg">
              <DollarSign className="mr-2 h-4 w-4" />
              Add ${amount || '0.00'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CashIn;
