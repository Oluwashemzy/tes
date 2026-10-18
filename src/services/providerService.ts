import { ethers } from 'ethers';

export function getAlchemyProvider(network = 'mainnet', alchemyKey?: string) {
  if (!alchemyKey) {
    return ethers.getDefaultProvider(network);
  }

  return new ethers.AlchemyProvider(network, alchemyKey);
}
