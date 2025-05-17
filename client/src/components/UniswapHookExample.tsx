import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function UniswapHookExample() {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Uniswap v4 Hook Example</CardTitle>
          <Badge className="bg-blue-600 hover:bg-blue-700">v4</Badge>
        </div>
        <CardDescription>
          Example of a custom hook for Uniswap v4 on Base
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 bg-neutral-50 p-4 rounded-md border border-neutral-200">
          <p className="text-sm text-gray-500 mb-2">This is an example implementation of a Uniswap v4 Hook with features that would be analyzed by AuditHook:</p>
          <pre className="text-xs bg-black text-green-400 p-3 rounded overflow-auto font-mono">
{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {BaseHook} from "v4-core/src/hooks/BaseHook.sol";
import {Hooks} from "v4-core/src/libraries/Hooks.sol";
import {IPoolManager} from "v4-core/src/interfaces/IPoolManager.sol";
import {PoolKey} from "v4-core/src/types/PoolKey.sol";
import {BalanceDelta} from "v4-core/src/types/BalanceDelta.sol";

contract DynamicFeeHook is BaseHook {
    // Storage for fee configurations
    mapping(bytes32 => uint24) public poolFees;
    
    constructor(IPoolManager _poolManager) BaseHook(_poolManager) {}
    
    // Specify which hooks to use
    function getHooksCalls() public pure override returns (Hooks.Calls memory) {
        return Hooks.Calls({
            beforeInitialize: true,
            afterInitialize: false,
            beforeSwap: true,
            afterSwap: false,
            beforeDonate: false,
            afterDonate: false,
            beforeAddLiquidity: false,
            afterAddLiquidity: false,
            beforeRemoveLiquidity: false,
            afterRemoveLiquidity: false
        });
    }
    
    // Set initial fee during pool initialization
    function beforeInitialize(
        address,
        PoolKey calldata key,
        uint160,
        bytes calldata data
    ) external override returns (bytes4) {
        uint24 fee = abi.decode(data, (uint24));
        bytes32 poolId = keccak256(abi.encode(key));
        poolFees[poolId] = fee;
        return BaseHook.beforeInitialize.selector;
    }
    
    // Adjust fee based on market conditions before each swap
    function beforeSwap(
        address,
        PoolKey calldata key,
        IPoolManager.SwapParams calldata params,
        bytes calldata
    ) external override returns (bytes4) {
        bytes32 poolId = keccak256(abi.encode(key));
        uint24 currentFee = poolFees[poolId];
        
        // Example logic to adjust fee based on swap size
        // Higher fees for larger swaps to protect against price impact
        if (params.amountSpecified > 1000 ether) {
            poolFees[poolId] = currentFee + 10; // Increase fee by 0.001%
        } else if (currentFee > 100 && params.amountSpecified < 10 ether) {
            poolFees[poolId] = currentFee - 5; // Decrease fee by 0.0005%
        }
        
        return BaseHook.beforeSwap.selector;
    }
}`}
          </pre>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="features">
            <AccordionTrigger>Key Features</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Dynamic fee adjustment based on trade size</li>
                <li>Hook integration with Uniswap v4 core</li>
                <li>Customizable initialization parameters</li>
                <li>Gas-efficient design for Base network</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="security">
            <AccordionTrigger>Security Considerations</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Potential for fee manipulation if not properly guarded</li>
                <li>Reentrancy risks during fee adjustments</li>
                <li>Integer overflow/underflow in fee calculations</li>
                <li>Access control for fee parameter updates</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="audit">
            <AccordionTrigger>How AuditHook Helps</AccordionTrigger>
            <AccordionContent>
              <p className="text-sm mb-2">AuditHook can detect the following issues in custom hooks:</p>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Detect improper hook registration with Uniswap v4</li>
                <li>Identify gas inefficiencies in hook implementations</li>
                <li>Find security vulnerabilities in dynamic parameter adjustments</li>
                <li>Ensure hook compatibility with Base network requirements</li>
                <li>Verify integration with Uniswap v4 interface standards</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}