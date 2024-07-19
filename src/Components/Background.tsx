import React from 'react'
import { View } from 'react-native'
import { COLORS } from '../Configs'

export const Background = () => {
    return (
        <View 
            style={{
                position: 'absolute',
                backgroundColor: COLORS.secondary,
                top: -250,
                width: 1000,
                height: 1200,
                transform: [
                    { rotate: '-70deg' }
                ]
            }}
        />
    )
}
