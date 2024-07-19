import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'

import HomeHeader from './HomeHeader'
import Banner from './Banner'
import Features from './Features'
import { COLORS, FONTS, SIZES, images } from '../Configs'

const Promos = () => {
    const specialPromoData = [
        {
          id: 1,
          img: images.promoBanner,
          title: "Bonus Cashback1",
          description: "¡No te lo pierdas. Agárralo ahora!",
        },
        {
          id: 2,
          img: images.promoBanner,
          title: "Bonus Cashback2",
          description: "¡No te lo pierdas. Agárralo ahora!",
        },
        {
          id: 3,
          img: images.promoBanner,
          title: "Bonus Cashback3",
          description: "¡No te lo pierdas. Agárralo ahora!",
        },
        {
          id: 4,
          img: images.promoBanner,
          title: "Bonus Cashback4",
          description: "¡No te lo pierdas. Agárralo ahora!",
        },
      ];
    const [specialPromos, setSpecialPromos] = React.useState(specialPromoData)

    const HeaderComponent = () => (
        <View>
            <HomeHeader/>
            <Banner/>
            <Features/>
            {/* {renderPromoHeader()} */}
        </View>
    )

    const renderPromoHeader = () => (
        <View
            style={{
                flexDirection: 'row',
                marginBottom: SIZES.padding
            }}
        >
            <View style={{ flex: 1 }}>
                <Text style={{ ...FONTS.h3,color: COLORS.blue }}>Special Promos</Text>
            </View>
            <TouchableOpacity
                onPress={() => console.log("View All")}
            >
                <Text style={{ color: COLORS.blue, ...FONTS.body4 }}>View All</Text>
            </TouchableOpacity>
        </View>

    )

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={{
                marginVertical: SIZES.base,
                width: SIZES.width / 2.5
            }}
            onPress={() => console.log(item.title)}
        >
            <View
                style={{
                    height: 80,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    backgroundColor: COLORS.primary
                }}
            >
                <Image
                    source={images.promoBanner}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: "100%",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20
                    }}
                />
            </View>

            <View
                style={{
                    padding: SIZES.padding,
                    backgroundColor: COLORS.lightGray,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20
                }}
            >
                <Text style={{ ...FONTS.h4 }}>{item.title}</Text>
                <Text style={{ ...FONTS.body4 }}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <FlatList
            ListHeaderComponent={HeaderComponent}
            contentContainerStyle={{ paddingHorizontal: SIZES.padding * 3 }}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            data={specialPromos}
            keyExtractor={item => `${item.id}`}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
                <View style={{ marginBottom: 80 }}>
                </View>
            }
        />
    )

}

export default Promos