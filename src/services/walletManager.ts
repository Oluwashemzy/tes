import 'react-native-get-random-values';
import { ethers } from 'ethers';
import { storeMnemonic, getMnemonic } from './secureStorage';

export async function createNewWallet() {
  const mnemonic = ethers.Wallet.createRandom().mnemonic?.phrase;

  if (!mnemonic) {
    throw new Error('Unable to generate wallet mnemonic');
  }

  const wallet = ethers.Wallet.fromPhrase(mnemonic);
  await storeMnemonic(mnemonic);

  return {
    mnemonic,
    address: wallet.address,
    wallet,
  };
}

export async function importWalletFromMnemonic(mnemonic: string) {
  const wallet = ethers.Wallet.fromPhrase(mnemonic.trim());
  await storeMnemonic(mnemonic.trim());

  return {
    address: wallet.address,
    wallet,
  };
}

export async function getStoredWallet(alchemyKey?: string) {
  const mnemonic = await getMnemonic();

  if (!mnemonic) {
    return null;
  }

  const wallet = ethers.Wallet.fromPhrase(mnemonic);
  const provider = alchemyKey
    ? new ethers.AlchemyProvider('mainnet', alchemyKey)
    : ethers.getDefaultProvider('mainnet');

  const signer = wallet.connect(provider);

  return {
    address: wallet.address,
    signer,
    wallet,
    mnemonic,
  };
}

export async function sendTransaction(
  signer: ethers.JsonRpcSigner,
  to: string,
  valueEth: string,
) {
  const tx = {
    to,
    value: ethers.parseEther(valueEth),
  };

  const response = await signer.sendTransaction(tx);
  return response;
}
