import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetBalanceQuery, useCreateMoneyRequestMutation } from '@/store/api/walletApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowUpCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Withdraw = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [agentIdentifier, setAgentIdentifier] = useState('');
  const { data: balanceData } = useGetBalanceQuery(undefined);
  const [createRequest, { isLoading }] = useCreateMoneyRequestMutation();
  const balance = balanceData?.balance ?? user?.balance ?? 0;

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    if (amount > 0 && amount <= balance && agentIdentifier.trim()) {
      try {
        await createRequest({
          agentIdentifier: agentIdentifier.trim(),
          amount,
          type: 'withdraw',
        }).unwrap();
        toast.success(`Withdrawal request of $${amount} sent to agent successfully`);
        setWithdrawAmount('');
        setAgentIdentifier('');
      } catch (error: any) {
        toast.error(error?.data?.message || 'Failed to send withdrawal request');
      }
    } else if (!agentIdentifier.trim()) {
      toast.error('Please enter agent email or phone number');
    } else if (amount > balance) {
      toast.error('Insufficient balance');
    } else {
      toast.error('Please enter a valid amount');
    }
  };

  const quickAmounts = [50, 100, 200, 500];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Withdraw Money</h1>
        <p className="text-muted-foreground">Cash out from your wallet to your bank account</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Balance */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Available Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">${balance.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground mt-2">Ready to withdraw</p>
          </CardContent>
        </Card>

        {/* Withdraw Form */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpCircle className="h-5 w-5 text-primary" />
              Withdraw Funds
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="agent-identifier">Agent Email or Phone Number</Label>
              <Input
                id="agent-identifier"
                type="text"
                placeholder="agent@example.com or +1234567890"
                value={agentIdentifier}
                onChange={(e) => setAgentIdentifier(e.target.value)}
                className="text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="withdraw-amount">Amount ($)</Label>
              <Input
                id="withdraw-amount"
                type="number"
                placeholder="0.00"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="text-lg"
              />
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-2">
              {quickAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => setWithdrawAmount(amount.toString())}
                  disabled={amount > balance}
                >
                  ${amount}
                </Button>
              ))}
            </div>

            <Button onClick={handleWithdraw} className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? 'Sending Request...' : 'Withdraw'}
            </Button>

            {parseFloat(withdrawAmount) > balance && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Insufficient balance. Maximum withdrawal: ${balance.toFixed(2)}
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Important Information */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>Withdrawal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
              1
            </div>
            <div>
              <h4 className="font-semibold mb-1">Instant Processing</h4>
              <p className="text-sm text-muted-foreground">Withdrawals are processed instantly during business hours</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
              2
            </div>
            <div>
              <h4 className="font-semibold mb-1">Bank Transfer</h4>
              <p className="text-sm text-muted-foreground">Funds will be transferred to your linked bank account</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
              3
            </div>
            <div>
              <h4 className="font-semibold mb-1">No Hidden Fees</h4>
              <p className="text-sm text-muted-foreground">We don't charge any fees for withdrawals</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Withdraw;
