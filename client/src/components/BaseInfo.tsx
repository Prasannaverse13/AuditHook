import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function BaseInfo() {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Base Network</h3>
          <Badge variant="outline" className="text-xs bg-primary/10 text-primary">
            Deep Integration
          </Badge>
        </div>
        <p className="text-sm text-neutral-700 mb-4">
          Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain. It's incubated within Coinbase and designed for developers.
        </p>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="connecting">
            <AccordionTrigger className="text-sm font-medium">
              Connecting to Base
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              <p className="mb-2">For this application, you can connect using:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>MetaMask Wallet (Recommended)</li>
                <li>Smart Wallet (Coinbase's Universal Wallet)</li>
              </ul>
              <p className="mt-2">The app is connected to Base Testnet.</p>
              <div className="mt-3 text-xs">
                <a 
                  href="https://docs.base.org/identity/smart-wallet/quickstart" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-primary hover:underline flex items-center"
                >
                  Learn about Smart Wallet →
                </a>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="hooks">
            <AccordionTrigger className="text-sm font-medium">
              Uniswap v4 Hooks
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              <p className="mb-2">This platform specializes in auditing Uniswap v4 hooks which can:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Customize liquidity logic</li>
                <li>Implement dynamic fees</li>
                <li>Create stablecoin-optimized pools</li>
                <li>Enable advanced DeFi integrations</li>
              </ul>
              <div className="mt-3 text-xs">
                <a 
                  href="https://docs.uniswap.org/contracts/v4/quickstart/hooks/setup" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-primary hover:underline flex items-center"
                >
                  Learn about Uniswap v4 Hooks →
                </a>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}