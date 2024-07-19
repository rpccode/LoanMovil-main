import { View, Text, Image } from 'react-native'
import React from 'react'
import { ThemeStyles } from '../Configs/constants/theme'
import { images } from '../Configs'



const Banner = () => {
    return (
        <View
            style={ThemeStyles.bannerContainer}
        >
            <Image
                source={images.banner}
                resizeMode="cover"
                style={ThemeStyles.bannerImg}
            />
        </View>
    )
}

export default Banner