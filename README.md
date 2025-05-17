# AuditHook: Smart Contract Security Analysis Platform

AuditHook is an advanced AI-powered smart contract auditing platform that combines cutting-edge technology with user-friendly design to enhance blockchain security and developer education. Built for the Base network and optimized for Uniswap v4 hooks, AuditHook empowers developers to create more secure DeFi applications.

## Key Features

- **AI-Driven Security Analysis**: Leverage advanced AI to identify vulnerabilities in smart contracts
- **Uniswap v4 Hook Integration**: Specialized auditing for Uniswap v4 hooks and interfaces
- **Base Network Focus**: Optimized for Base mainnet deployment and integration
- **Gas Optimization Detection**: Identify opportunities to reduce gas costs in your contracts
- **Educational Resources**: Access Base and Uniswap best practices directly within the platform
- **Interactive Results**: User-friendly presentation of security findings with severity ratings and recommendations

## Technology Stack

- **Frontend**: React (TypeScript) with Shadcn UI components
- **Backend**: Node.js with Express
- **AI Analysis**: Google's Gemini AI integration via API
- **Blockchain Connectivity**: Base mainnet integration with onchainkit
- **State Management**: React Query for efficient data fetching

## Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│       ├── components/     # UI components
│       ├── hooks/          # Custom React hooks
│       ├── lib/            # Utility functions
│       └── pages/          # Application pages
├── server/                 # Backend Express server
│   ├── services/           # Service modules
│   └── routes.ts           # API endpoints
└── shared/                 # Shared types and schemas
```

## Resource Integration

### Base Network Resources

Base network integration is primarily implemented in:
- `client/src/lib/baseUtils.ts` - Utility functions for Base mainnet interactions
- `server/services/baseService.ts` - Backend service for Base network interactions
- `client/src/components/BaseInfo.tsx` - Component displaying Base network information

### Uniswap v4 Integration

Uniswap v4 hooks integration can be found in:
- `client/src/components/UniswapHookExample.tsx` - Example component showcasing Uniswap v4 hook patterns
- `client/src/lib/contractAnalysis.ts` - Contract analysis with Uniswap v4 hook awareness
- `server/services/auditService.ts` - Audit service with specific Uniswap hook vulnerability detection

### OnchainKit Integration

OnchainKit is used throughout the application for Base network interactions:
- `client/src/components/WalletConnect.tsx` - Wallet connection with OnchainKit
- `client/src/hooks/useWallet.tsx` - Custom hook for wallet interactions via OnchainKit

### AI Analysis Implementation

AI-powered analysis is primarily implemented in:
- `server/services/geminiService.ts` - Service for interacting with Google's Gemini API
- `server/services/auditService.ts` - Service for auditing smart contracts with AI enhancement

## Getting Started

### Prerequisites

- Node.js 18+ installed
- NPM or Yarn package manager
- Base account (for testing with real contracts)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/audithook.git
cd audithook
```

2. Install dependencies
```bash
npm install
```

3. Start the application
```bash
npm run dev
```

The application will be available at http://localhost:5000

## Using AuditHook

1. Connect to Base mainnet using MetaMask or another compatible wallet
2. Navigate to the audit page
3. Paste your smart contract code into the editor
4. Select the audit options you want to apply
5. Click "Analyze Contract" to start the audit
6. Review the results, which include security findings, gas optimization suggestions, and best practices

## Resources

AuditHook integrates with several key resources:
- [Base Documentation](https://docs.base.org/) - For Base network integration
- [Uniswap v4 Documentation](https://docs.uniswap.org/contracts/v4/quickstart/hooks/setup) - For Uniswap hook integration
- [OnchainKit Documentation](https://onchainkit.xyz/) - For simplified onchain integrations
- [Smart Wallet Development](https://smartwallet.dev/) - For wallet integration resources
- [Base.org](https://www.base.org/getstarted) - For general Base network resources
- [Coinbase Developer Platform](https://docs.cdp.coinbase.com/) - For additional integration resources

## License

This project is licensed under the MIT License. See the LICENSE file for details.