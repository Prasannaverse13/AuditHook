import React from "react";

interface HeroSectionProps {
  onStartAuditing: () => void;
  onLearnMore: () => void;
}

export default function HeroSection({ onStartAuditing, onLearnMore }: HeroSectionProps) {
  return (
    <section className="mb-10">
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-8 text-white">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold mb-4">AI-Powered Hook Auditing for Uniswap v4</h2>
          <p className="text-white/90 mb-6">
            Enhance the security and reliability of your Uniswap v4 hooks with AI-powered smart contract analysis. 
            Identify vulnerabilities, optimize gas efficiency, and ensure compliance with best practices before deployment on Base.
          </p>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <button
              onClick={onStartAuditing}
              className="px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-neutral-100 transition-colors"
            >
              Start Auditing
            </button>
            <button
              onClick={onLearnMore}
              className="px-6 py-3 bg-blue-700/30 text-white rounded-lg border border-white/30 font-medium hover:bg-blue-700/50 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
