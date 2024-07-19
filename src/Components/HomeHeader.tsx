import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useContext } from 'react';

import HeaderTitle from './HeaderTitle';
import {  COLORS, SIZES, icons } from '../Configs';

const HomeHeader = () => {
    
    
    return (
        <View style={{ 
            flexDirection: 'row',
             marginVertical: SIZES.padding * 2, 
             justifyContent: 'space-between', 
             alignItems: 'center' 
             }}>
            <HeaderTitle title='Bienvenido de Nuevo' name={'Rudy Casilla'} bw={0} color={COLORS.ivory} />
            
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity
                    style={{
                        height: 40,
                        width: 40,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: COLORS.white,
                        borderRadius: 8,
                        borderColor: COLORS.blue,
                        borderWidth: 1,
                    }}
                >
                    <Image
                        source={icons.bell}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.navyBlue
                        }}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            top: -5,
                            right: -5,
                            height: 10,
                            width: 10,
                            backgroundColor: COLORS.coral,
                            borderRadius: 5
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default HomeHeader;
