import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FONTS, SIZES, COLORS} from '../../constants';
import {Error} from '../../components';

interface InventoryItem {
  id: string;
  name: string;
  totalStock: number;
  price: number;
  description: string;
}

const Add: React.FC = () => {
  const navigation = useNavigation();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [name, setName] = useState<string>('');
  const [totalStock, setTotalStock] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    const loadItems = async () => {
      const storedItems = await AsyncStorage.getItem('inventory');
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    };
    loadItems();
  }, []);

  const handleAddItem = async () => {
    // Check if item name already exists
    const isItemNameExist = items.some(item => item.name === name);
    if (isItemNameExist) {
      return Alert.alert('Item name must be unique');
    }

    // Validate fields
    if (!name.trim()) {
      return Alert.alert('Please enter a valid item name');
    }
    if (!totalStock.trim() || isNaN(parseInt(totalStock))) {
      return Alert.alert('Please enter a valid totalStock');
    }
    if (!price.trim() || isNaN(parseInt(price))) {
      return Alert.alert('Please enter a valid price');
    }
    if (!description.trim()) {
      return Alert.alert('Please enter a description');
    }

    // Create new item object
    const newItem: InventoryItem = {
      id: Math.random().toString(),
      name,
      totalStock: parseInt(totalStock),
      price: parseInt(price),
      description,
    };

    // Update state and AsyncStorage
    setItems([...items, newItem]);
    await AsyncStorage.setItem(
      'inventory',
      JSON.stringify([...items, newItem]),
    );
    navigation.replace('Inventory');
  };

  return (
    <View style={styles.body}>
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.container}>
        <View style={styles.authContent}>
          <Text style={styles.title}>Add new inventory Item</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.label}>Enter item name</Text>
          </View>

          <View style={styles.inputStyle}>
            <TextInput
              style={styles.input}
              placeholderTextColor={COLORS.gray}
              keyboardType="default"
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.label}>Total Stock</Text>
          </View>

          <View style={styles.inputStyle}>
            <TextInput
              style={styles.input}
              placeholderTextColor={COLORS.gray}
              keyboardType="numeric"
              value={totalStock}
              onChangeText={setTotalStock}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.label}>Price</Text>
          </View>
          <View style={styles.inputStyle}>
            <TextInput
              style={styles.input}
              placeholderTextColor={COLORS.gray}
              keyboardType="numeric"
              value={price}
              onChangeText={setPrice}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.label}>Description</Text>
          </View>
          <View style={{...styles.inputStyle, height: 100}}>
            <TextInput
              style={styles.input}
              placeholderTextColor={COLORS.gray}
              keyboardType="default"
              value={description}
              onChangeText={setDescription}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.button} onPress={handleAddItem}>
            <Text style={styles.btnLabel}>Add</Text>
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
    ...FONTS.body3,
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
  input: {flex: 1},
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

export default Add;
