import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {COLORS, FONTS, SIZES} from '../../constants';
import {Header, Categories, Item} from '../../components';
import {TouchableOpacity} from 'react-native-gesture-handler';

interface InventoryItem {
  id: string;
  name: string;
  totalStock: number;
  price: number;
}

type InventoryProps = {
  navigation: NavigationProp<any>;
};

const Dashboard = ({ navigation} : InventoryProps): JSX.Element => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [userData, setUserData] = useState<string>('');

  const fetchCurrentUser = async (): Promise<void> => {
    const userData = await AsyncStorage.getItem('userObject');
    if (userData !== null) {
      setUserData(userData);
    } else {
      setUserData('');
    }
  };

  const loadItems = async (): Promise<void> => {
    const storedItems = await AsyncStorage.getItem('inventory');
    if (storedItems !== null) {
      setItems(JSON.parse(storedItems));
    } else {
      setItems([]);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('auth');
    navigation.navigate('Auth')
  }

  useEffect(() => {
    loadItems();
    fetchCurrentUser();
  }, []);

  const renderItem = ({item}: {item: InventoryItem}): JSX.Element => (
    <Item
      title={item.name}
      totalStock={item.totalStock}
      price={item.price}
      onPress={() => navigation.navigate('Update', {item})}
    />
  );

  return (
    <SafeAreaView style={styles.screen}>
      <Header user={userData && userData} onPress={handleLogout}/>
      <ScrollView>
        <View style={styles.body}>
          <View style={styles.wrapper}>
            <Text style={styles.header}>Categories</Text>
          </View>
          <View style={styles.categoriesSection}>
            <Categories title="Resisitor" />
            <Categories title="Capacitor" />
            <Categories title="Transistors" />
            <Categories title="Mosfet" />
          </View>
          <View style={styles.itemList}>
            <View
              style={{
                ...styles.wrapper,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View>
                <Text style={styles.header}>Inventory Items</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('Add')}>
                <Text style={styles.btnLabel}>+ Add new record</Text>
              </TouchableOpacity>
            </View>
            {items.length ? (
              <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            ) : (
              <View style={styles.emptyItemWrap}>
                <Text style={styles.emptyText}>
                  You currently do not have any inventory item {'\n'} Click the
                  Add new record button.
                </Text>
              </View>
            )}
          </View>
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
    margin: SIZES.margin / 1.2,
    marginHorizontal: SIZES.margin,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    ...FONTS.body4,
    color: COLORS.primary,
    fontWeight: '500',
  },
  cardContainer: {
    alignItems: 'center',
  },
  categoriesSection: {
    paddingHorizontal: SIZES.radius,
    paddingVertical: SIZES.padding / 3,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.radius,
  },
  itemList: {
    marginTop: SIZES.margin,
  },
  btnLabel: {
    ...FONTS.body4,
  },
  emptyItemWrap: {
    height: SIZES.height / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {...FONTS.body4, color: COLORS.textColor, textAlign: 'center'},
});

export default Dashboard;
