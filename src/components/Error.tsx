import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import {COLORS, FONTS, SIZES} from '../constants';

interface ErrorProps {
  error: string;
}

export default function Error({error}: ErrorProps): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          source={require('../assets/icons/warning.png')}
          style={styles.icon}
          resizeMode="contain"
        />
        <Text style={styles.text}>{error}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    ...FONTS.body5,
    color: COLORS.textError,
    fontWeight: '500',
    paddingLeft: SIZES.radius / 4,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
