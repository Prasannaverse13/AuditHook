import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Resource } from "@/lib/types";
import { apiRequest } from "@/lib/queryClient";
import { useQuery } from "@tanstack/react-query";

// Default resources to use in case of an error or when loading
const defaultResources: Resource[] = [
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

export default function ResourcesCard() {
  // Use React Query to fetch resources
  const { data: resources = defaultResources, isLoading } = useQuery({
    queryKey: ['/api/resources'],
    queryFn: async () => {
      try {
        return await apiRequest<Resource[]>({
          url: '/api/resources',
          method: 'GET'
        });
      } catch (error) {
        console.error("Error loading resources:", error);
        // Return default resources on error
        return defaultResources;
      }
    }
  });
  
  return (
    <Card id="resources" className="mb-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-medium mb-4">Security Resources</h3>
        {isLoading ? (
          <div className="flex justify-center p-4">
            <svg className="animate-spin h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <div className="space-y-4">
            {resources.map((resource) => (
              <a
                key={resource.id}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 border border-neutral-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors"
              >
                <h4 className="font-medium text-sm">{resource.title}</h4>
                <p className="text-xs text-neutral-700 mt-1">{resource.description}</p>
              </a>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
