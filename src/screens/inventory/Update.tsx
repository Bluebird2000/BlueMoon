import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FONTS, SIZES, COLORS} from '../../constants';

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
}

const Update = (): JSX.Element => {

  const route = useRoute().params;
  console.log('...route', route)
  const navigation = useNavigation();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    async function loadItems() {
      const storedItems = await AsyncStorage.getItem('inventory');
      if (storedItems) {
        setItems(JSON.parse(storedItems));
      }
    }
    loadItems();
  }, []);

  const handleUpdateItem = async () => {
    const newItem: InventoryItem = {
      id: Math.random().toString(),
      name,
      quantity: parseInt(quantity),
    };
    setItems([...items, newItem]);
    await AsyncStorage.setItem('inventory', JSON.stringify([...items, newItem]));
    navigation.replace('Inventory');
  };

  const handleDeleteItem = async (id: string) => {
    const newItems = items.filter(item => item.id !== id);
    setItems(newItems);
    navigation.replace('Inventory');
  };
  

  return (
    <View style={styles.body}>
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.container}>
        <View style={styles.authContent}>
          <Text style={styles.title}>Update Item ({route?.item?.name})</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.label}>Enter item name</Text>
          </View>

          <View style={styles.inputStyle}>
            <TextInput
              style={{flex: 1}}
              placeholder="Enter item name"
              placeholderTextColor={COLORS.gray}
              keyboardType="default"
              value={route?.item?.name}
              onChangeText={setName}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.button} onPress={handleUpdateItem}>
            <Text style={styles.btnLabel}>Update</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={{ ...styles.button, opacity: .3}} onPress={() => handleDeleteItem(route?.item.id)}>
            <Text style={styles.btnLabel}>Delete Item</Text>
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
    paddingHorizontal: SIZES.padding,
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

export default Update;
