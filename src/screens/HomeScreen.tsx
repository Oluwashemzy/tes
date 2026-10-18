import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useWallet } from '../contexts/WalletContext';

export const HomeScreen: React.FC = () => {
  const { address, refresh, loading } = useWallet();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wallet</Text>

      {loading ? (
        <Text>Loading wallet...</Text>
      ) : address ? (
        <>
          <Text style={styles.label}>Address</Text>
          <Text selectable style={styles.address}>{address}</Text>
          <View style={styles.buttonRow}>
            <Button title="Refresh" onPress={refresh} />
          </View>
        </>
      ) : (
        <Text>No wallet found. You need to create or import one.</Text>
      )}
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
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 20,
  },
  buttonRow: {
    marginTop: 12,
  },
});
