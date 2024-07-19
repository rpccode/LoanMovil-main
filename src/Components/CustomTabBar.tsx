import { View } from 'react-native';
import React from 'react';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { COLORS } from '../Configs';


const CustomTabBar = (props) => {
    return isIphoneX() ? (
        <View>
            <View
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 30,
                    backgroundColor: COLORS.base,
                }}
            />
            <BottomTabBar {...props.props} />
        </View>
    ) : (
        <BottomTabBar {...props.props} />
    );
};

export default CustomTabBar;
