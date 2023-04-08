import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  TextInput,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FONTS, SIZES, COLORS} from '../../constants';

interface InventoryItem {
  id: string;
  name: string;
  totalStock: number;
  price: number;
  description: string;
}

const Update = (): JSX.Element => {
  const navigation = useNavigation();
  const route = useRoute().params;
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [name, setName] = useState(route.item.name);
  const [totalStock, setTotalStock] = useState<number>(route.item.totalStock);
  const [price, setPrice] = useState<number>(route.item.price);
  const [description, setDescription] = useState<string>(
    route.item.description,
  );

  const loadItems = async (): Promise<void> => {
    const storedItems = await AsyncStorage.getItem('inventory');
    if (storedItems !== null) {
      setItems(JSON.parse(storedItems));
    } else {
      setItems([]);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleUpdateItem = async () => {
    if (!name) {
      return Alert.alert('Name is required');
    }

    const isItemNameExist = items.some(
      item => item.name === name && item.id !== route?.item?.id,
    );
    if (isItemNameExist) {
      return Alert.alert('Item name must be unique');
    }

    if (!totalStock || isNaN(totalStock)) {
      return Alert.alert('Total stock is required and must be a number');
    }

    if (!price || isNaN(price)) {
      return Alert.alert('Price is required and must be a number');
    }

    if (!description || description.trim().split(' ').length < 3) {
      return Alert.alert(
        'Description is required and must have at least three words',
      );
    }

    const updatedItems = items.map(item => {
      if (item.id === route?.item?.id) {
        return {
          ...item,
          name,
          totalStock: parseInt(totalStock),
          price: parseFloat(price.toFixed(2)),
          description,
        };
      } else {
        return item;
      }
    });

    setItems(updatedItems);
    await AsyncStorage.setItem('inventory', JSON.stringify(updatedItems));
    navigation.replace('Inventory');
  };

  const handleDeleteItem = async (id: string): Promise<void> => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            const newItems = items.filter(item => item.id !== id);
            setItems(newItems);
            await AsyncStorage.setItem('inventory', JSON.stringify(newItems));
            navigation.replace('Inventory');
          },
          style: 'destructive',
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View style={styles.body}>
          <KeyboardAwareScrollView
            keyboardDismissMode="on-drag"
            contentContainerStyle={styles.container}>
            <View style={styles.authContent}>
              <Text style={styles.title}>
                Update Item ({route?.item?.name})
              </Text>
            </View>

            <View style={styles.inputContainer}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.label}>Item name</Text>
              </View>

              <View style={styles.inputStyle}>
                <TextInput
                  style={{flex: 1}}
                  placeholderTextColor={COLORS.gray}
                  keyboardType="default"
                  defaultValue={name}
                  onChangeText={newName => {
                    const updatedItem = {...route?.item, name: newName};
                    setName(newName);
                    setItems(
                      items.map(item =>
                        item.id === updatedItem.id ? updatedItem : item,
                      ),
                    );
                  }}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.label}>Total stock</Text>
              </View>

              <View style={styles.inputStyle}>
                <TextInput
                  style={{flex: 1}}
                  placeholderTextColor={COLORS.gray}
                  keyboardType="numeric"
                  defaultValue={totalStock.toString()}
                  onChangeText={newTotalStock =>
                    setTotalStock(parseInt(newTotalStock))
                  }
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.label}>Price</Text>
              </View>

              <View style={styles.inputStyle}>
                <TextInput
                  style={{flex: 1}}
                  placeholderTextColor={COLORS.gray}
                  keyboardType="numeric"
                  defaultValue={price.toString()}
                  onChangeText={price => setPrice(parseInt(price))}
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.label}>Enter total stock</Text>
              </View>

              <View style={{...styles.inputStyle, height: 100}}>
                <TextInput
                  style={{flex: 1}}
                  placeholderTextColor={COLORS.gray}
                  keyboardType="numeric"
                  defaultValue={description}
                  onChangeText={description => setDescription(description)}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handleUpdateItem}>
                <Text style={styles.btnLabel}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{...styles.button, opacity: 0.3}}
                onPress={() => handleDeleteItem(route.item.id)}>
                <Text style={styles.btnLabel}>Delete Item</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  body: {
    paddingBottom: SIZES.padding,
    paddingVertical: SIZES.padding,
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
