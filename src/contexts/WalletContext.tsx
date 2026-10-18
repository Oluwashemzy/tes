import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getStoredWallet } from '../services/walletManager';

interface WalletContextValue {
  address: string | null;
  signer: ethers.JsonRpcSigner | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

const WalletContext = createContext<WalletContextValue>({
  address: null,
  signer: null,
  loading: true,
  refresh: async () => undefined,
});

export const WalletProvider: React.FC<{
  children: React.ReactNode;
  alchemyKey?: string;
}> = ({ children, alchemyKey }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [signer, setSigner] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const wallet = await getStoredWallet(alchemyKey);

    if (wallet) {
      setAddress(wallet.address);
      setSigner(wallet.signer);
    } else {
      setAddress(null);
      setSigner(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const value = useMemo(
    () => ({
      address,
      signer,
      loading,
      refresh,
    }),
    [address, signer, loading],
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export function useWallet() {
  return useContext(WalletContext);
}
