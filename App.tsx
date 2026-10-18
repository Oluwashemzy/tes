import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { WalletProvider, useWallet } from './contexts/WalletContext';
import { OnboardingScreen } from './screens/OnboardingScreen';
import { HomeScreen } from './screens/HomeScreen';

const RootApp = () => {
  const { address, loading } = useWallet();

  if (loading) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      {address ? <HomeScreen /> : <OnboardingScreen />}
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <WalletProvider>
      <RootApp />
    </WalletProvider>
  );
};

export default App;
