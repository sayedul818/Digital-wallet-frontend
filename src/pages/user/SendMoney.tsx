import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useSearchUsersQuery, useSendMoneyMutation } from '@/store/api/walletApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Send, Search } from 'lucide-react';
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

const SendMoney = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState<any>(null);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const balance = user?.balance || 0;

  const { data: searchResult, isLoading: searching } = useSearchUsersQuery({ search: searchQuery }, { skip: !searchQuery });
  const [sendMoney, { isLoading: sending }] = useSendMoneyMutation();

  const filteredRecipients = searchResult?.users || [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;
    if (!searchResult || (searchResult.users && searchResult.users.length === 0)) {
      toast.error('No user found with that information');
    }
  };

  const handleSendClick = () => {
    const amountNum = parseFloat(amount);

    if (!selectedRecipient) {
      toast.error('Please select a recipient');
      return;
    }

    if (!amount || amountNum <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (amountNum > balance) {
      toast.error('Insufficient balance');
      return;
    }

    setShowConfirmDialog(true);
  };

  const handleConfirmSend = () => {
    (async () => {
      try {
        const amountNum = parseFloat(amount);
        await sendMoney({ receiverPhone: selectedRecipient.phone, amount: amountNum }).unwrap();
        toast.success(`$${amount} sent to ${selectedRecipient.name} successfully!`);
      } catch (err: any) {
        toast.error(err?.data?.message || err?.message || 'Transfer failed');
      }
    })();
    setSelectedRecipient(null);
    setAmount('');
    setNote('');
    setSearchQuery('');
    setShowConfirmDialog(false);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Send Money</h1>
        <p className="text-muted-foreground">Transfer money to another user instantly</p>
      </div>

      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>Search Recipient</CardTitle>
          <CardDescription>Find user by name, email, or phone number</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, or phone"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Button type="submit">Search</Button>
            </div>
          </form>

          {searchQuery && (
            <div className="mt-4 space-y-2">
              {filteredRecipients.length > 0 ? (
                filteredRecipients.map((recipient) => (
                  <div
                    key={recipient.id}
                    onClick={() => setSelectedRecipient(recipient)}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedRecipient?.id === recipient.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:bg-muted/50'
                    }`}
                  >
                    <p className="font-medium">{recipient.name}</p>
                    <p className="text-sm text-muted-foreground">{recipient.email}</p>
                    <p className="text-sm text-muted-foreground">{recipient.phone}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">No users found</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedRecipient && (
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Transfer Details</CardTitle>
            <CardDescription>Sending to {selectedRecipient.name}</CardDescription>
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
              <p className="text-sm text-muted-foreground">
                Available balance: ${balance.toFixed(2)}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Note (Optional)</Label>
              <Textarea
                id="note"
                placeholder="Add a note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
              />
            </div>

            <Button onClick={handleSendClick} className="w-full" size="lg">
              <Send className="mr-2 h-4 w-4" />
              Send ${amount || '0.00'}
            </Button>
          </CardContent>
        </Card>
      )}

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Transfer</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to send <strong>${amount}</strong> to{' '}
              <strong>{selectedRecipient?.name}</strong>. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmSend}>Confirm Send</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SendMoney;
