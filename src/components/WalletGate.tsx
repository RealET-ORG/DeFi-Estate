import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Logo } from './ui/Logo';

type WalletGateProps = {
  children: React.ReactNode;
};

/**
 * Until a wallet is connected, only the connect screen is shown (no nav or other routes).
 */
export function WalletGate({ children }: WalletGateProps) {
  const { status, isConnected } = useAccount();

  if (status === 'reconnecting' || status === 'connecting') {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-void-950 text-cream-100 px-4">
        <p className="text-cream-400 text-sm">Loading wallet…</p>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-void-950 text-cream-100 px-4 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/[0.06] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/[0.03] rounded-full blur-[100px]" />
        </div>
        <div className="relative z-10 flex flex-col items-center text-center max-w-md w-full">
          <div className="mb-10">
            <Logo />
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold text-cream-100 mb-3">
            Connect your wallet
          </h1>
          <p className="text-cream-400 mb-10 leading-relaxed">
            Connect a wallet to explore properties, your portfolio, and the rest of the app.
          </p>
          <div className="flex justify-center [&_button]:!bg-accent [&_button]:!text-void-950 [&_button]:!rounded-lg [&_button]:min-h-[48px] [&_button]:px-8">
            <ConnectButton />
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
