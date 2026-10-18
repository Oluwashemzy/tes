import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { createNewWallet, importWalletFromMnemonic } from '../services/walletManager';
import { useWallet } from '../contexts/WalletContext';

export const OnboardingScreen: React.FC = () => {
  const { refresh } = useWallet();
  const [mnemonicInput, setMnemonicInput] = useState('');
  const [generatedMnemonic, setGeneratedMnemonic] = useState<string | null>(null);

  const handleCreateWallet = async () => {
    const created = await createNewWallet();
    setGeneratedMnemonic(created.mnemonic);
    await refresh();
  };

  const handleImportWallet = async () => {
    if (!mnemonicInput.trim()) {
      return;
    }

    await importWalletFromMnemonic(mnemonicInput.trim());
    await refresh();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create or import wallet</Text>

      <Button title="Create new wallet" onPress={handleCreateWallet} />

      {generatedMnemonic ? (
        <View style={styles.box}>
          <Text style={styles.label}>Seed phrase</Text>
          <Text selectable style={styles.seed}>{generatedMnemonic}</Text>
        </View>
      ) : null}

      <View style={styles.importSection}>
        <Text style={styles.label}>Import with mnemonic</Text>
        <TextInput
          multiline
          value={mnemonicInput}
          onChangeText={setMnemonicInput}
          placeholder="Enter your 12 or 24-word seed phrase"
          style={styles.input}
        />
        <Button title="Import wallet" onPress={handleImportWallet} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  box: {
    marginTop: 20,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
  },
  label: {
    fontWeight: '600',
    marginBottom: 8,
  },
  seed: {
    fontSize: 14,
    lineHeight: 20,
  },
  importSection: {
    marginTop: 30,
  },
  input: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    textAlignVertical: 'top',
  },
});
