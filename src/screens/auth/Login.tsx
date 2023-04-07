import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FONTS, SIZES, COLORS} from '../../constants';
import {Error} from '../../components';

type LoginProps = {
  navigation: NavigationProp<any>;
};

const Login = ({navigation}: LoginProps): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async (): Promise<void> => {
    try {
      const auth = await AsyncStorage.getItem('auth');
      if (auth !== null) {
        navigation.navigate('Inventory');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onLogin = async () => {
    setError(false);
    if (email !== '' && password !== '') {
      try {
        await AsyncStorage.setItem('auth', 'true');
        await AsyncStorage.setItem('userObject', email);
        navigation.navigate('Inventory');
      } catch (error) {
        setError(true);
      }
    } else {
      setError(true);
    }
  };

  return (
    <View style={styles.body}>
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.container}>
        <View style={styles.authContent}>
          <Text style={styles.title}>Let's Sign You In</Text>
          <Text style={styles.subTitle}>Welcome back, you've been missed</Text>
        </View>

        <View style={styles.inputContainer}>
          {error && <Error error="All fieds are required" />}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.label}>Email Address</Text>
          </View>

          <View style={styles.inputStyle}>
            <TextInput
              style={{flex: 1}}
              placeholder="Enter your email address"
              placeholderTextColor={COLORS.gray}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.label}>Password</Text>
          </View>

          <View style={styles.inputStyle}>
            <TextInput
              style={{flex: 1}}
              placeholder="Enter your password"
              placeholderTextColor={COLORS.gray}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.button} onPress={onLogin}>
            <Text style={styles.btnLabel}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingBottom: 100,
    paddingVertical: SIZES.padding,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
  },
  authContent: {
    marginTop: SIZES.padding * 3,
    marginBottom: SIZES.margin,
  },
  title: {
    ...FONTS.h3,
    textTransform: 'capitalize',
  },
  subTitle: {
    color: COLORS.gray,
    marginTop: SIZES.base,
    ...FONTS.body4,
  },
  inputContainer: {
    marginTop: SIZES.margin,
  },
  inputStyle: {
    flexDirection: 'row',
    height: 55,
    paddingHorizontal: SIZES.radius,
    marginTop: SIZES.base,
    borderRadius: SIZES.radius / 2,
    backgroundColor: COLORS.lightGray,
  },
  label: {color: COLORS.gray, ...FONTS.body4},
  btnLabel: {
    color: COLORS.white,
    ...FONTS.body3,
    fontWeight: '500',
  },
  button: {
    width: '100%',
    height: 55,
    borderRadius: 6,
    marginTop: SIZES.margin * 2,
    backgroundColor: COLORS.primary,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default Login;
