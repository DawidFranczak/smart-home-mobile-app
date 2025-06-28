import * as SecureStore from "expo-secure-store";

export async function saveSecureValue(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getSecureValue(key: string): Promise<string> {
  const result = await SecureStore.getItemAsync(key);
  if (result === null) {
    return "";
  }
  return result;
}

export async function deleteSecureValue(key: string) {
  await SecureStore.deleteItemAsync(key);
}
