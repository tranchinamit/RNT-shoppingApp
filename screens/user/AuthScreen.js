import React, { useReducer, useCallback, useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useDispatch } from 'react-redux'
import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import { bAndroidOS } from '../../utils/helpers';
import Colors from '../../constants/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { signIn, signUp } from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, { type, input, value, isValid }) => {
  if (type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [input]: value
    }

    const updatedValidities = {
      ...state.inputValues,
      [input]: isValid
    }

    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid
    };
  }
  return state;
}

export default ({ navigation }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: 'woody@gmail.com',
      password: '123456',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error])

  const authHandler = async () => {
    // navigation.navigate('Shop');

    const { email, password } = formState.inputValues;
    let action;
    if (isSignUp) {
      action = signUp({
        email,
        password
      });
    } else {
      action = signIn({ email, password });
    }

    setError(null);
    setLoading(true);
    try {
      await dispatch(action);
      // switchNavigation.navigate('Shop');
      navigation.navigate('Shop');
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  }

  const inputChangeHandler = useCallback((inputIdentifier, text, isValid) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      input: inputIdentifier,
      value: text,
      isValid,
    });
  }, [dispatchFormState]);

  return (
    <KeyboardAvoidingView
      behavior={bAndroidOS ? "height" : "padding"}
      keyboardVerticalOffset={bAndroidOS ? 0 : 64}
      // behavior="padding"
      // keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient style={styles.gradient} colors={['#ffedff', '#ffe3ff']}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="Email"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address!"
              onInputChange={inputChangeHandler}
              initialValue="woody@gmail.com"
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={6}
              autoCapitalize="none"
              errorText="Please enter a valid password!"
              onInputChange={inputChangeHandler}
              initialValue="123456"
            />
            <View style={styles.buttonContainer}>
              {isLoading ?
                <ActivityIndicator size="large" color={Colors.primary} /> : (
                  <Button
                    title={isSignUp ? "Sign Up" : "Sign In"}
                    color={Colors.primary}
                    onPress={authHandler}
                  />
                )}

            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignUp ? 'Sign In' : 'Sign Up'}`}
                color={Colors.accent}
                onPress={() => setIsSignUp(!isSignUp)}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
})
