import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useWallet } from "@/hooks/useWallet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ArrowRight } from "lucide-react";

interface SmartWalletProps {
  isConnected: boolean;
}

export default function SmartWallet({ isConnected }: SmartWalletProps) {
  const [receiverAddress, setReceiverAddress] = useState<string>("");
  const [transferAmount, setTransferAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { wallet } = useWallet();

  // Smart Wallet logo
  const SmartWalletLogo = () => (
    <svg 
      className="w-8 h-8 text-blue-600" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="24" fill="currentColor" fillOpacity="0.1" />
      <path d="M34 16H14C11.7909 16 10 17.7909 10 20V28C10 30.2091 11.7909 32 14 32H34C36.2091 32 38 30.2091 38 28V20C38 17.7909 36.2091 16 34 16Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="4" fill="currentColor" />
    </svg>
  );

  // Transfer ETH using Smart Wallet
  const transferETH = async () => {
    if (!receiverAddress) {
      toast({
        title: "Receiver address required",
        description: "Please enter a valid Ethereum address",
        variant: "destructive",
      });
      return;
    }

    if (!transferAmount || parseFloat(transferAmount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid ETH amount",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // In a real implementation, we would call the Smart Wallet SDK to transfer ETH
      // For demo purposes, we'll just simulate a successful transfer
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Transfer successful!",
        description: `Successfully sent ${transferAmount} ETH to ${receiverAddress.substring(0, 6)}...${receiverAddress.substring(receiverAddress.length - 4)}`,
        variant: "default",
      });
      
      setReceiverAddress("");
      setTransferAmount("");
    } catch (error) {
      toast({
        title: "Transfer failed",
        description: "Failed to send ETH. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // If not connected, don't render
  if (!isConnected) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <SmartWalletLogo />
          <h3 className="text-lg font-medium">Smart Wallet</h3>
        </div>
        
        {/* Account Info */}
        <div className="bg-neutral-100 p-4 rounded-lg mb-6">
          <h4 className="font-medium text-sm mb-2">Account Info</h4>
          <div className="space-y-1 text-sm">
            <p><span className="text-neutral-600">Address:</span> {wallet.address.slice(0, 6)}...{wallet.address.slice(-4)}</p>
            <p><span className="text-neutral-600">Balance:</span> {wallet.balance || '100'} ETH</p>
            <p><span className="text-neutral-600">Network:</span> Base Mainnet</p>
          </div>
        </div>
        
        {/* Transfer ETH */}
        <div className="border border-neutral-200 rounded-lg p-4">
          <h4 className="font-medium text-sm mb-3">Send ETH</h4>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="receiver" className="text-xs font-medium text-neutral-700">Receiver Address</Label>
              <Input
                id="receiver"
                placeholder="0x..."
                value={receiverAddress}
                onChange={(e) => setReceiverAddress(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="amount" className="text-xs font-medium text-neutral-700">Amount (ETH)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="0.01"
                min="0"
                step="0.01"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <Button 
              onClick={transferETH} 
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Send ETH</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </Button>
            
            <div className="text-xs text-neutral-500 flex items-start gap-1.5 mt-2">
              <AlertCircle className="h-3.5 w-3.5 text-blue-600 flex-shrink-0 mt-0.5" />
              <span>Transfers are done on Base Mainnet. Smart Wallet handles all gas fees automatically.</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}