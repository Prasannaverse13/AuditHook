import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { auditContract } from "./services/auditService";
import { z } from "zod";
import { AuditRequest, InsertAuditReport } from "@shared/schema";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  // API prefix for all routes
  const API_PREFIX = '/api';
  
  // Get health check
  app.get(`${API_PREFIX}/health`, (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });
  
  // Get resources for security guidelines
  app.get(`${API_PREFIX}/resources`, (req: Request, res: Response) => {
    const resources = [
      {
        id: '1',
        title: 'Uniswap v4 Hook Development',
        description: 'Learn about developing custom hooks for Uniswap v4',
        url: 'https://docs.uniswap.org/contracts/v4/quickstart/hooks/setup'
      },
      {
        id: '2',
        title: 'Base Smart Contract Best Practices',
        description: 'Official guidelines for secure smart contracts on Base',
        url: 'https://docs.base.org/use-cases/defi-your-app'
      },
      {
        id: '3',
        title: 'Gas Optimization Techniques',
        description: 'How to reduce gas costs in your smart contracts on Base',
        url: 'https://docs.base.org/use-cases/go-gasless'
      },
      {
        id: '4',
        title: 'Smart Wallet Integration',
        description: 'Learn how to integrate Smart Wallet with your DeFi applications',
        url: 'https://docs.base.org/identity/smart-wallet/quickstart'
      }
    ];
    
    res.status(200).json(resources);
  });
  
  // Audit contract submission endpoint
  app.post(`${API_PREFIX}/audit`, async (req: Request, res: Response) => {
    try {
      // Schema to validate the request body
      const auditRequestSchema = z.object({
        contractSource: z.string().min(1, "Contract source is required"),
        options: z.object({
          vulnerabilityScan: z.boolean().default(true),
          gasOptimization: z.boolean().default(true),
          bestPractices: z.boolean().default(true),
          aiRecommendations: z.boolean().default(true)
        })
      });
      
      // Validate request
      const auditRequest = auditRequestSchema.parse(req.body) as AuditRequest;
      
      // Perform the audit
      const auditResult = await auditContract(auditRequest);
      
      // Store audit result - for hackathon demo, we'll create a default user record
      // In a real app this would be associated with the authenticated user
      const auditReport: InsertAuditReport = {
        userId: 1, // Default user ID for demo purposes
        contractSource: auditRequest.contractSource,
        securityScore: auditResult.securityScore,
        issuesCount: auditResult.issuesCount,
        gasEfficiency: auditResult.gasEfficiency,
        findings: auditResult.findings,
        createdAt: new Date().toISOString()
      };
      
      try {
        await storage.createAuditReport(auditReport);
      } catch (error) {
        console.error('Failed to store audit report:', error);
        // Non-critical error, continue without failing the request
      }
      
      // Return the audit result
      res.status(200).json(auditResult);
    } catch (error) {
      console.error('Error processing audit request:', error);
      
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: 'Invalid request data', 
          errors: error.errors 
        });
      }
      
      res.status(500).json({ message: 'Failed to process audit request' });
    }
  });
  
  // Base account balance endpoint
  app.get(`${API_PREFIX}/base/balance/:accountAddress`, async (req: Request, res: Response) => {
    try {
      const { accountAddress } = req.params;
      
      if (!accountAddress) {
        return res.status(400).json({ message: 'Account address is required' });
      }
      
      // For demo purposes, we'll return a fixed balance for Base Mainnet
      // In a real implementation, we would query the Base network
      const mockBalance = "100.0";
      
      res.status(200).json({ accountAddress, balance: mockBalance, network: 'base-mainnet' });
    } catch (error) {
      console.error('Error fetching Base account balance:', error);
      res.status(500).json({ message: 'Failed to fetch account balance' });
    }
  });
  
  // Get deployed contracts information
  app.get(`${API_PREFIX}/base/contracts`, (req: Request, res: Response) => {
    try {
      const contractsFilePath = path.join(path.dirname(__dirname), 'deployed-contracts.json');
      
      // Check if the file exists
      if (!fs.existsSync(contractsFilePath)) {
        return res.status(404).json({ message: 'No deployed contracts found' });
      }
      
      // Read the file
      const contractsData = fs.readFileSync(contractsFilePath, 'utf8');
      const contracts = JSON.parse(contractsData);
      
      // Update network and links for Base ecosystem
      const baseContracts = Array.isArray(contracts) ? contracts.map(contract => ({
        ...contract,
        network: 'base-testnet',
        contractLinks: {
          viewOnBlockExplorer: `https://testnet.basescan.org/address/${contract.contractLinks?.evmAddress || ''}`,
          evmAddress: contract.contractLinks?.evmAddress
        }
      })) : [];
      
      res.status(200).json(baseContracts);
    } catch (error) {
      console.error('Error fetching deployed contracts:', error);
      res.status(500).json({ message: 'Failed to fetch deployed contracts' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
