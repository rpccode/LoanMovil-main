import React from 'react';
import SwipeableFlatList from 'react-native-swipeable-list';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import CustomerCard from './CustomerCard';
import {Persona} from '../../../Configs/interfaces';
import {COLORS} from '../../../Configs';
import {Background} from '../../../Components/Background';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

interface CustomerListProps {
  customers: Persona[];
}

const CustomerList: React.FC<CustomerListProps> = ({customers}) => {
  const QuickActions = (index: number, item: Persona) => (
    <View style={styles.quickActionsContainer}>
      <TouchableOpacity
        style={{...styles.quickAction, backgroundColor: COLORS.darkYellow}}
        onPress={() => handleEdit(item)}>
        <Text style={styles.actionText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...styles.quickAction,
          backgroundColor: COLORS.darkRed,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
        onPress={() => handleDelete(item)}>
        <Text style={styles.actionText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  const handleEdit = (item: Persona) => {
    // Handle edit action
    console.log('Edit', item);
  };

  const handleDelete = (item: Persona) => {
    // Handle delete action
    console.log('Delete', item);
  };

  return (
    <SwipeableFlatList
      keyExtractor={item => item.idPersona.toString()}
      data={customers}
      renderItem={({item}) => <CustomerCard customer={item} />}
      maxSwipeDistance={240}
      renderQuickActions={({index, item}) => QuickActions(index, item)}
      contentContainerStyle={styles.list}
      shouldBounceOnMount={true}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flexGrow: 1,
    width: '100%',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  quickActionsContainer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    paddingHorizontal: 5,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: SCREEN_WIDTH * 0.9,
    height: 120, // Same height as CustomerCard
    borderRadius: 10,
  },
  quickAction: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: '100%',
  },
  actionText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default CustomerList;
