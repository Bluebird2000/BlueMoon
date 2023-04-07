import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';

interface HeaderProps {
  user: string;
}

export default function Header({user}: HeaderProps): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.leftContainer}>
          <Text style={styles.text}>Hi {user}</Text>
        </View>
        <View style={styles.rightContainer}></View>
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
    flex: 0.25,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    ...FONTS.body3,
    color: COLORS.textColor,
    fontWeight: '600',
  },
});
