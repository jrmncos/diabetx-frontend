
import * as SecureStore from 'expo-secure-store';

const TOKEN = 'token'
const DNI = 'dni'

export async function getItem(key) {
  const value = await SecureStore.getItemAsync(key)
  return value ? value : null
}

export async function setItem(key, value){
  return SecureStore.setItemAsync(key, value)
}
export async function removeItem(key){
  return SecureStore.deleteItemAsync(key)
}

export const getToken = () => getItem(TOKEN)
export const removeToken = () => removeItem(TOKEN)
export const setToken = (value) => setItem(TOKEN, value)

export const getDni = () => getItem(DNI)
export const removeDni = () => removeItem(DNI)
export const setDni = (value) => setItem(DNI, value)
