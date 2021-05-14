import React, { useEffect } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { getSession, saveSession, clearSession } from '../storage';
import { useDispatch } from 'react-redux';
import Colors from './../constants/Colors'
import { authenticate } from '../store/actions/auth';

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const trySignIn = async () => {
      try {
        const userData = await getSession();
        if (userData && Date.parse(new Date()) < userData.expired) {
          await dispatch(authenticate({ ...userData, expirationTime: 3600 * 1000 }));
          navigation.navigate('Shop');
        } else {
          await clearSession();
          navigation.navigate('Auth');
        }
      } catch (err) {
        console.log(err)
      } finally {
        return true;
      }
    }


    trySignIn()
    return () => { };
  }, [dispatch]);

  return (
    <View style={styles.centered}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  )
}
