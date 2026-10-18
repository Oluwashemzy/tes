# Tes Wallet

A starter crypto wallet app built with React Native, TypeScript, and ethers.js.

Features
- Create a new wallet from a fresh BIP39 mnemonic
- Import a wallet from an existing mnemonic
- Store the mnemonic using the platform secure keystore
- Derive an EVM wallet address using ethers.js
- Connect to Alchemy or the default provider
- Basic send transaction flow scaffold
- Wallet context and onboarding flow

Tech stack
- React Native
- TypeScript
- ethers.js
- react-native-keychain
- WalletConnect-compatible entry points

Quick start

1. Install dependencies:
   npm install

2. iOS:
   cd ios && pod install && cd ..

3. Start Metro:
   npm start

4. Run app:
   npm run android
   # or
   npm run ios

Environment notes
- For production, add your RPC provider key (Alchemy/Infura) as an environment variable or config value.
- Never store mnemonics or private keys in plain text.
- This is a starter app for learning and MVP prototyping, not a production wallet without audits and security review.

Project structure
- `src/services`: secure storage, wallet manager, provider service
- `src/contexts`: wallet state context
- `src/screens`: onboarding and home screens
- `src/App.tsx`: app entry

Security warning
- Seed phrases must be backed up securely off-device.
- Wallets should never expose private keys in logs or telemetry.
