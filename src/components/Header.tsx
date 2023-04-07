import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';

interface HeaderProps {
  user: string;
  onPress: () => void;
}

export default function Header({user, onPress}: HeaderProps): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.leftContainer}>
          <Text style={styles.text}>Hi {user.substring(0, 3)}...</Text>
        </View>
        <TouchableOpacity style={styles.rightContainer} onPress={onPress}>
          <Text style={{ ...styles.text, color: COLORS.textError}}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    height: 60,
    paddingHorizontal: SIZES.padding,
    marginTop: SIZES.margin / 2,
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightContainer: {
    flexDirection: 'row',
    // flex: 0.25,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    ...FONTS.body3,
    color: COLORS.textColor,
    fontWeight: '600',
  },
});
