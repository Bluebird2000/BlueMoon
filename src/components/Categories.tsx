import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {FONTS, SIZES} from '../constants';

interface CategoryProps {
  title: string;
}

export default function Categories({title}: CategoryProps): JSX.Element {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      <View style={styles.card}>
        <View style={styles.imageWrap}></View>
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {alignItems: 'center'},
  card: {
    paddingHorizontal: SIZES.padding / 1.3,
    paddingVertical: SIZES.radius * 1.5,
    marginBottom: SIZES.radius,
    borderColor: '#EFF3F9',
    borderWidth: 1,
    borderRadius: SIZES.radius,
  },
  imageWrap: {height: 25, width: 25},
  cardIcon: {
    width: 15,
    height: 30,
  },
  cardTitle: {
    ...FONTS.body4,
  },
});
