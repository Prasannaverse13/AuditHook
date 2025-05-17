import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { isWalletInstalled } from "@/lib/metamaskUtils";

interface WalletConnectProps {
  isConnected: boolean;
  isLoading: boolean;
  onConnect: () => Promise<boolean> | boolean | void;
  onDisconnect: () => void;
  connectError?: string | null;
}

export default function WalletConnect({
  isConnected,
  isLoading,
  onConnect,
  onDisconnect,
  connectError = null,
}: WalletConnectProps) {
  // Check if wallet is installed (using MetaMask check under the hood)
  const isWalletAvailable = isWalletInstalled();

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

  // For non-installed wallet
  if (!isWalletAvailable && !isConnected) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <a 
              href="https://docs.base.org/identity/smart-wallet/quickstart" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-blue-300 hover:bg-blue-50 text-blue-600 h-10 px-4 py-2"
            >
              <SmartWalletLogo />
              <span className="ml-2">Install Wallet</span>
            </a>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>You need to install MetaMask or Smart Wallet to use this feature.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <div className="relative">
      {isConnected ? (
        <Button
          onClick={onDisconnect}
          variant="outline"
          className="border-red-300 hover:bg-red-50 text-red-600 font-medium"
        >
          <SmartWalletLogo />
          <span className="ml-2">Disconnect</span>
        </Button>
      ) : (
        <TooltipProvider>
          <Tooltip open={!!connectError}>
            <TooltipTrigger asChild>
              <Button
                onClick={onConnect}
                disabled={isLoading}
                variant="outline"
                className="border-blue-600 border hover:bg-blue-600/10 text-blue-600 font-medium"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent"></div>
                    <span>Connecting...</span>
                  </div>
                ) : (
                  <>
                    <SmartWalletLogo />
                    <span className="ml-2">Connect Wallet</span>
                  </>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs bg-red-50 border border-red-200">
              <p className="text-red-800 text-xs">
                {connectError || "Please approve the connection request in your wallet popup"}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      
      {/* Add wallet help text for improved UX */}
      {!isConnected && !isLoading && (
        <div className="mt-2 text-xs text-gray-500 absolute right-0 top-[100%] mt-2 bg-white p-2 rounded-md shadow-sm border border-gray-100 w-[260px]">
          <p>Click to connect your wallet. When prompted, approve the connection request in your wallet popup.</p>
          <a 
            href="https://docs.base.org/identity/smart-wallet/quickstart" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-xs block mt-1 font-medium"
          >
            Learn about Smart Wallet →
          </a>
        </div>
      )}
    </div>
  );
}