import { View, Switch, Platform } from 'react-native';
import React from 'react';
import { useSwichForm } from '../hooks';
import { COLORS } from '../Configs'; // Asegúrate de que esta importación apunte al archivo correcto

interface Props {
    isOn: boolean;
    onChange: (value: boolean) => void;
}

export default function SwitchComponent({ isOn, onChange }: Props) {
    const { isEnabled, toggleSwitch } = useSwichForm(isOn, onChange);

    return (
        <View>
            <Switch
                trackColor={{ false: COLORS.gray, true: COLORS.primary }}
                thumbColor={Platform.OS === 'android' ? COLORS.primary : ''}
                ios_backgroundColor={COLORS.ivory}
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
}
