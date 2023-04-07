import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {FONTS, SIZES} from '../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface ItemProps {
  title: string;
  quantity: number;
  onPress: () => void;
}

export default function Item({
  title,
  quantity,
  onPress,
}: ItemProps): JSX.Element {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardSub}>{quantity}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: SIZES.radius / 2,
  },
  card: {
    paddingHorizontal: SIZES.padding / 1.3,
    paddingVertical: SIZES.radius * 1.5,
    marginBottom: SIZES.radius,
    borderColor: '#EFF3F9',
    borderWidth: 1,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardIcon: {
    width: 15,
    height: 30,
  },
  cardTitle: {
    ...FONTS.body4,
  },
  cardSub: {
    ...FONTS.body5,
  },
});
