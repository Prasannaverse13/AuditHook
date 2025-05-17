import React, { useRef } from "react";
import Layout from "@/components/Layout";
import HeroSection from "@/components/HeroSection";
import AuditForm from "@/components/AuditForm";
import AuditResults from "@/components/AuditResults";
import ResourcesCard from "@/components/ResourcesCard";
import BaseInfo from "@/components/BaseInfo";
import DeployedContracts from "@/components/DeployedContracts";
import SmartWallet from "@/components/SmartWallet";
import UniswapHookExample from "@/components/UniswapHookExample";
import { useAudit } from "@/hooks/useAudit";
import { useWallet } from "@/hooks/useWallet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const {
    contractSource,
    setContractSource,
    options,
    updateOption,
    result,
    isAnalyzing,
    error,
    analyzeSmartContract
  } = useAudit();
  
  const { wallet, isLoading, connectError, connectWallet, disconnectWallet } = useWallet();
  
  const auditSectionRef = useRef<HTMLDivElement>(null);
  const resourcesSectionRef = useRef<HTMLDivElement>(null);
  
  const scrollToAuditSection = () => {
    auditSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToResources = () => {
    resourcesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Smart Wallet logo
  const SmartWalletLogo = () => (
    <svg 
      className="h-12 w-12 mb-4 text-blue-600" 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="24" fill="currentColor" fillOpacity="0.1" />
      <path d="M34 16H14C11.7909 16 10 17.7909 10 20V28C10 30.2091 11.7909 32 14 32H34C36.2091 32 38 30.2091 38 28V20C38 17.7909 36.2091 16 34 16Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="24" cy="24" r="4" fill="currentColor" />
    </svg>
  );

  // Render the wallet connection notice if not connected
  const renderWalletConnectionNotice = () => {
    return (
      <Card className="mb-8 border-2 border-dashed border-primary/30">
        <CardContent className="pt-6 pb-6">
          <div className="flex flex-col items-center text-center">
            <SmartWalletLogo />
            <h2 className="text-xl font-semibold mb-2">Wallet Connection Required</h2>
            <p className="text-neutral-600 mb-4">
              Connect your wallet to access the smart contract auditing tools.
              The audit functionality requires a wallet connection.
            </p>
            
            {connectError && (
              <div className="bg-red-50 border border-red-200 rounded p-3 mb-4 text-left w-full">
                <p className="text-red-700 text-sm font-medium">Connection Error</p>
                <p className="text-red-600 text-xs mt-1">{connectError}</p>
                <p className="text-red-500 text-xs mt-2">
                  If you rejected the connection request, please try again and approve the connection in your wallet popup.
                </p>
              </div>
            )}
            
            <Button 
              onClick={connectWallet} 
              disabled={isLoading}
              size="lg"
              className="gap-2 bg-blue-600 text-white hover:bg-blue-700 shadow-md"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-200 border-t-transparent"></div>
                  <span>Connecting...</span>
                </div>
              ) : (
                <>
                  <SmartWalletLogo />
                  <span className="ml-2">Connect Wallet</span>
                </>
              )}
            </Button>
            
            <div className="mt-4 text-sm text-neutral-600">
              <p className="mb-2">When prompted, approve the connection request in your wallet popup.</p>
              <a 
                href="https://docs.base.org/identity/smart-wallet/quickstart" 
                target="_blank" 
                rel="noreferrer"
                className="text-primary underline text-sm hover:text-primary/80"
              >
                Learn about Smart Wallet integration
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };
  
  return (
    <Layout>
      <HeroSection 
        onStartAuditing={scrollToAuditSection} 
        onLearnMore={scrollToResources} 
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Audit Input */}
        <div className="lg:col-span-2">
          <div ref={auditSectionRef}>
            {wallet.isConnected ? (
              <AuditForm
                contractSource={contractSource}
                onContractSourceChange={setContractSource}
                options={options}
                onOptionChange={updateOption}
                isAnalyzing={isAnalyzing}
                error={error}
                onSubmit={analyzeSmartContract}
              />
            ) : (
              renderWalletConnectionNotice()
            )}
          </div>
          
          {result && wallet.isConnected && <AuditResults result={result} />}
        </div>
        
        {/* Right Column: Resources & Info */}
        <div className="lg:col-span-1">
          <div ref={resourcesSectionRef}>
            <ResourcesCard />
          </div>
          
          <BaseInfo />
          
          <UniswapHookExample />
        </div>
      </div>
    </Layout>
  );
}