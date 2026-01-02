import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useGetBalanceQuery, useCreateMoneyRequestMutation } from '@/store/api/walletApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowDownCircle } from 'lucide-react';
import { toast } from 'sonner';

const Deposit = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [depositAmount, setDepositAmount] = useState('');
  const [agentIdentifier, setAgentIdentifier] = useState('');
  const { data: balanceData } = useGetBalanceQuery(undefined);
  const [createRequest, { isLoading }] = useCreateMoneyRequestMutation();
  const balance = balanceData?.balance ?? user?.balance ?? 0;

  const handleDeposit = async () => {
    const amount = parseFloat(depositAmount);
    if (amount > 0 && agentIdentifier.trim()) {
      try {
        await createRequest({
          agentIdentifier: agentIdentifier.trim(),
          amount,
          type: 'deposit',
        }).unwrap();
        toast.success(`Deposit request of $${amount} sent to agent successfully`);
        setDepositAmount('');
        setAgentIdentifier('');
      } catch (error: any) {
        toast.error(error?.data?.message || 'Failed to send deposit request');
      }
    } else if (!agentIdentifier.trim()) {
      toast.error('Please enter agent email or phone number');
    } else {
      toast.error('Please enter a valid amount');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Deposit Money</h1>
        <p className="text-muted-foreground">Add funds to your wallet through an agent</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Balance */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">${balance.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground mt-2">Available to withdraw</p>
          </CardContent>
        </Card>

        {/* Deposit Form */}
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowDownCircle className="h-5 w-5 text-success" />
              Deposit Funds
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
              <Label htmlFor="deposit-amount">Amount ($)</Label>
              <Input
                id="deposit-amount"
                type="number"
                placeholder="0.00"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="text-lg"
              />
            </div>
            <Button onClick={handleDeposit} className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? 'Sending Request...' : 'Request Deposit'}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Your deposit request will be sent to an available agent for processing
            </p>
          </CardContent>
        </Card>
      </div>

      {/* How it Works */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle>How Deposit Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
              1
            </div>
            <div>
              <h4 className="font-semibold mb-1">Submit Request</h4>
              <p className="text-sm text-muted-foreground">Enter the amount you want to deposit and submit your request</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
              2
            </div>
            <div>
              <h4 className="font-semibold mb-1">Agent Processing</h4>
              <p className="text-sm text-muted-foreground">An available agent will receive and process your deposit request</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
              3
            </div>
            <div>
              <h4 className="font-semibold mb-1">Funds Added</h4>
              <p className="text-sm text-muted-foreground">Once confirmed, the funds will be added to your wallet balance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Deposit;
