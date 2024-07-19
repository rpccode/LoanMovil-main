import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import HeaderTitle from './HeaderTitle';
import {COLORS, icons, SIZES} from '../Configs';
import LinearGradient from 'react-native-linear-gradient';
import {ThemeStyles} from '../Configs/constants/theme';
import { useNavigation } from '@react-navigation/native';

type customHeaderProps = {
  title: string;
  color: string;
  handlefuntion?: () => void;
};

export default function CustomHeader({title, color,handlefuntion}: customHeaderProps) {
  const navigation = useNavigation();
 
  return (
    <View style={styles.HeaderContainer}>
      <TouchableOpacity onPress={navigation.goBack}>
        <Image
          source={icons.back}
          resizeMode="contain"
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.black,
          }}
        />
      </TouchableOpacity>
      <Text style={{...styles.headerTitle,textTransform:'uppercase'}}>{title}</Text>
      <TouchableOpacity onPress={handlefuntion}>
        <Image
          source={icons.filter_list}
          resizeMode="contain"
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.black,
            
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
const styles = ThemeStyles;
