import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONTS, SIZES, icons } from '../Configs';

interface Feature {
    id: number;
    icon: any; // Asegúrate de que el tipo de icono sea compatible
    color: string;
    backgroundColor: string;
    description: string;
}

const Features = () => {
    const featuresData: Feature[] = [
        {
            id: 1,
            icon: icons.calculate,
            color: COLORS.purple, // Púrpura
            backgroundColor: COLORS.lightPurple, // Púrpura claro
            description: "Calculate"
        },
        {
            id: 2,
            icon: icons.user,
            color: COLORS.yellow, // Amarillo
            backgroundColor: COLORS.lightYellow, // Amarillo claro
            description: "Customer"
        },
        {
            id: 3,
            icon: icons.wallet,
            color: COLORS.red, // Rojo
            backgroundColor: COLORS.lightRed, // Rojo claro
            description: "Wallet"
        },
        {
            id: 4,
            icon: icons.bill,
            color: COLORS.yellow, // Amarillo
            backgroundColor: COLORS.lightYellow, // Amarillo claro
            description: "Bill"
        },
        {
            id: 5,
            icon: icons.loan2,
            color: COLORS.green, // Amarillo
            backgroundColor: COLORS.lightGreen, // Amarillo claro
            description: "Loan"
        },
        {
            id: 6,
            icon: icons.pagar,
            color: COLORS.lightGreen, // Amarillo
            backgroundColor: COLORS.darkGreen, // Amarillo claro
            description: "Pay"
        },
       
       
      
    ];

    const navigate = useNavigation();
    const [features, setFeatures] = React.useState(featuresData);

    const Header = () => (
        <View style={{ marginBottom: SIZES.padding * 2 }}>
            <Text style={{ ...FONTS.h3, color: COLORS.navyBlue }}>Características</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={{ marginBottom: SIZES.padding * 2, width: 60, alignItems: 'center' }}
            onPress={() => navigate.navigate(item.description as never)}
        >
            <View
                style={{
                    height: 50,
                    width: 50,
                    marginBottom: 5,
                    borderRadius: 20,
                    backgroundColor: item.backgroundColor,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Image
                    source={item.icon}
                    resizeMode="contain"
                    style={{
                        height: 20,
                        width: 20,
                        tintColor: item.color
                    }}
                />
            </View>
            <Text style={{ textAlign: 'center', flexWrap: 'wrap', ...FONTS.body5, color: COLORS.navyBlue }}>{item.description}</Text>
        </TouchableOpacity>
    );

    return (
        <FlatList
            ListHeaderComponent={Header}
            data={features}
            numColumns={4}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            style={{ marginTop: SIZES.padding * 2 }}
        />
    );
};

export default Features;
