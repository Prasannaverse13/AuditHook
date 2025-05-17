import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, Code2 } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import WalletConnect from "@/components/WalletConnect";

export default function Header() {
  const { wallet, isLoading, connectError, connectWallet, disconnectWallet } = useWallet();

  // Smart Wallet logo
  const SmartWalletLogo = () => (
    <svg 
      className="h-5 w-5 text-blue-600" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="24" fill="currentColor" fillOpacity="0.1" />
      <path d="M34 16H14C11.7909 16 10 17.7909 10 20V28C10 30.2091 11.7909 32 14 32H34C36.2091 32 38 30.2091 38 28V20C38 17.7909 36.2091 16 34 16Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="4" fill="currentColor" />
    </svg>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <div className="flex items-center gap-2">
              <Code2 className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                AuditHook
              </span>
            </div>
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            className="border-blue-600 hover:bg-blue-600/10 text-blue-600"
            onClick={() => window.location.href = '/trial'}
          >
            Start Free Trial
          </Button>
          <WalletConnect
            isConnected={wallet.isConnected}
            isLoading={isLoading}
            connectError={connectError}
            onConnect={connectWallet}
            onDisconnect={disconnectWallet}
          />
        </div>
      </div>
    </header>
  );
}