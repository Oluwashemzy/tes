import * as Keychain from 'react-native-keychain';

const MNEMONIC_KEY = 'wallet_mnemonic_v1';

export async function storeMnemonic(mnemonic: string, requireBiometry = true) {
  const options: Keychain.Options = {
    service: MNEMONIC_KEY,
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
    accessControl: requireBiometry ? Keychain.ACCESS_CONTROL.BIOMETRY_ANY : undefined,
  };

  await Keychain.setGenericPassword('wallet', mnemonic, options);
}

export async function getMnemonic() {
  const credentials = await Keychain.getGenericPassword({ service: MNEMONIC_KEY });
  if (!credentials) {
    return null;
  }

  return credentials.password;
}

export async function clearMnemonic() {
  await Keychain.resetGenericPassword({ service: MNEMONIC_KEY });
}
