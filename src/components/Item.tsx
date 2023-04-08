import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, FONTS, SIZES} from '../constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import { formatNumber } from '.';

interface ItemProps {
  title: string;
  totalStock: number;
  price: number;
  onPress: () => void;
}

export default function Item({
  title,
  totalStock,
  price,
  onPress,
}: ItemProps): JSX.Element {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.card}>
        <View style={{ flex: 0.45 }}>
          <Text style={styles.cardSub}>Name</Text>
          <Text style={styles.cardTitle}>{title}</Text>
        </View>
        <View style={{ flex: 0.45 }}>
          <Text style={styles.cardSub}>Price</Text>
          <Text style={styles.cardTitle}>{formatNumber(price)}</Text>
        </View>
        <View style={{ flex: 0.1 }}>
          <Text style={styles.cardSub}>Qty</Text>
          <Text style={styles.cardTitle}>{formatNumber(totalStock)}</Text>
        </View>
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
    backgroundColor: '#EFF3F9'
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
    color: COLORS.gray,
  },
});
