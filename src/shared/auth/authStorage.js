import * as Keychain from 'react-native-keychain';

export const saveRefreshToken = async token => {
  await Keychain.setGenericPassword('refreshToken', token, {
    service: 'refreshToken',
  });
};

export const getRefreshToken = async () => {
  const credentials = await Keychain.getGenericPassword({
    service: 'refreshToken',
  });

  return credentials?.password || null;
};

export const clearRefreshToken = async () => {
  await Keychain.resetGenericPassword({
    service: 'refreshToken',
  });
};
