import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'

import { useNavigation } from '@react-navigation/native'

interface Props{
    menuItem : MenuItem
}



const FlatListMenuItem = ({ menuItem }: Props) => {

  const navigation =  useNavigation()
    return (
       <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate(menuItem.componet as never)}
       >
         <View style={styles.constainer} >
            <Icon
                name={menuItem.icon}
                color='red'
                size={23}
            
            />
            <Text style={styles.itemText}>
                {menuItem.name}
            </Text>
            <View style={{ flex:1}} />
            <Icon
                name="chevron-forward-outline"
                color='blue'
                size={23}
            
            />
        </View>
       </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  constainer:{
    flexDirection:'row'
  },
  itemText:{
    marginLeft:10,
    fontSize:18
  }
})


export default FlatListMenuItem