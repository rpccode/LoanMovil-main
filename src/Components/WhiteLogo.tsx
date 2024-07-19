import React from 'react'
import { Image, View } from 'react-native'

export const WhiteLogo = () => {
    return (
        <View style={{
            alignItems: 'center'
        }}>
            <Image 
                source={ require('../Configs/assets/ic_launcher_foreground.png') }
                style={{
                    width: 210,
                    height: 200 
                }}
            />
        </View>
    )
}
