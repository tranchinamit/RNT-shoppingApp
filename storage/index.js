import AsyncStorage from '@react-native-async-storage/async-storage';


export const saveSession = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('auth', jsonValue)
  } catch (err) {
    // saving error
    console.log(err)
  }
}

export const clearSession = async () => {
  try {
    await AsyncStorage.removeItem('auth')
  } catch (err) {
    // saving error
    console.log(err)
  }
}


export const getSession = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('auth')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (err) {
    // saving error
    console.log(err)
  }
}
