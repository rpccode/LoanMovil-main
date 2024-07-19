import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Features from '../../Components/Features';
import CreditCard from '../../Components/CreditCard';
import HomeHeader from '../../Components/HomeHeader';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS, SIZES, ThemeStyles} from '../../Configs/constants/theme';
import Dashboard from '../../Components/Dashboard';
import {icons} from '../../Configs';

const HomeScreens = () => {
  return (
    <View style={{...ThemeStyles.containerr, backgroundColor: COLORS.base}}>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: SIZES.padding * 2,
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10 * 3,
          paddingTop: 8,
          position: 'relative',
          zIndex: 1,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
        }}>
        <Text style={{...FONTS.h3, color: COLORS.darkBlue, fontWeight: 'bold'}}>
          Loan Movil
        </Text>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          
          <TouchableOpacity
            style={{
              height: 40,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.white,
              borderRadius: 20,
              borderColor: COLORS.blue,
              borderWidth: 1,
            }}>
            <Image
              source={icons.bell}
              style={{
                width: 20,
                height: 20,
                tintColor: COLORS.navyBlue,
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
                borderRadius: 5,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{paddingHorizontal: 10 * 3, paddingTop: 8}}>
        <View style={{marginBottom: SIZES.padding * 2}}>
          <Text style={{...FONTS.h3, color: COLORS.navyBlue}}>
            Balance Actual
          </Text>
          <View
            style={{
              marginTop: SIZES.padding,
              marginBottom: SIZES.padding,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{...FONTS.largeTitle, color: COLORS.darkBlue}}>
              $12,000.00
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: COLORS.navyBlue,
                padding: SIZES.padding ,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                
              }}
              onPress={() => console.log('Balance clicked')}>
                <Text style={{...FONTS.body4, color: COLORS.white}}>USD</Text>
              </TouchableOpacity>
          </View>
        </View>

        <View style={{marginBottom: SIZES.padding}}>
          <Text style={{...FONTS.h3, color: COLORS.navyBlue}}>
            Descripción general
          </Text>
          
        <View 
        style={{ 
          flexDirection: 'row',
          justifyContent:'space-between',
          alignItems: 'center',
          marginBottom: SIZES.padding,
        }}
        >
        <CreditCard titleCard={'Prestado'} cardNumber={'4000'} expires={'12/02/24'} colorText={COLORS.green}  />
        <CreditCard titleCard={'Cobrado'} cardNumber={'8000'} expires={'12/02/24'} colorText={COLORS.blue}  />
        </View>

        </View>

        {/* <Dashboard/> */}
         {/* <Banner /> */}
        <Features />
        {/* <CircularBarList /> */}
      </View>
    </View>
  );
};

export default HomeScreens;
