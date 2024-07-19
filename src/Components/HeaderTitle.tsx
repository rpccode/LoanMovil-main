import {View, Text} from 'react-native';
import React from 'react';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS, FONTS} from '../Configs';

interface Props {
  title: string;
  name: string;
  color: string;
  bw: number;
}
const HeaderTitle = ({title, name, color = COLORS.base1, bw = 0}: Props) => {
  const {top} = useSafeAreaInsets();

  return (
    <View
      style={{
        marginTop: top + 20,
        marginBottom: 20,
        borderBottomWidth: bw,
        borderBottomColor: color,
        paddingHorizontal: 6,
      }}>
      <Text style={{...FONTS.h1, color}}>{title}</Text>
      <Text style={{...FONTS.body2, color}}>{name}</Text>
    </View>
  );
};

export default HeaderTitle;
