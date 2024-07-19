import React, { useContext, useEffect } from 'react'
import { KeyboardAvoidingView, Platform, Text, View, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native'


import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext, COLORS } from '../../../Configs';
import { useForm } from '../../../hooks';
import { WhiteLogo } from '../../../Components';
import { loginStyles } from '../../../Themes/loginTheme';


interface Props extends StackScreenProps<any,any>{}


export const RegisterScreen = ( { navigation }: Props ) => {


    const { email, password, name, onChange } = useForm({
        name: '',
        email: '',
        password: '' 
     });

    //  useEffect(() => {
    //     if( errorMessage.length === 0 ) return;

    //     Alert.alert( 'Registro incorrecto', errorMessage,[{
    //         text: 'Ok',
    //         onPress: removeError
    //     }]);

    // }, [ errorMessage ])
 
     const onRegister = () => {
         console.log({email, password, name});
         Keyboard.dismiss();
      
     }


    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: COLORS.blue }}
                behavior={ ( Platform.OS === 'ios') ? 'padding': 'height' }
            >


                <View style={ loginStyles.formContainer }>                
                    {/* Keyboard avoid view */}
                    <WhiteLogo />

                    <Text style={ loginStyles.title }>Registro</Text>

                    <Text style={ loginStyles.label }>Nombre:</Text>
                    <TextInput 
                        placeholder="Ingrese su nombre:"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="white"
                        style={[ 
                            loginStyles.inputField,
                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"

                        onChangeText={ (value) => onChange(value, 'name') }
                        value={ name.value }
                        onSubmitEditing={ onRegister }

                        autoCapitalize="words"
                        autoCorrect={ false }
                    />


                    <Text style={ loginStyles.label }>Email:</Text>
                    <TextInput 
                        placeholder="Ingrese su email:"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        keyboardType="email-address"
                        underlineColorAndroid="white"
                        style={[ 
                            loginStyles.inputField,
                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"

                        onChangeText={ (value) => onChange(value, 'email') }
                        value={ email.value }
                        onSubmitEditing={ onRegister }


                        autoCapitalize="none"
                        autoCorrect={ false }
                    />


                    <Text style={ loginStyles.label }>Contraseña:</Text>
                    <TextInput 
                        placeholder="******"
                        placeholderTextColor="rgba(255,255,255,0.4)"
                        underlineColorAndroid="white"
                        secureTextEntry
                        style={[ 
                            loginStyles.inputField,
                            ( Platform.OS === 'ios' ) && loginStyles.inputFieldIOS
                        ]}
                        selectionColor="white"

                        onChangeText={ (value) => onChange(value, 'password') }
                        value={ password.value }
                        onSubmitEditing={ onRegister }

                        autoCapitalize="none"
                        autoCorrect={ false }
                    />


                    {/* Boton login */}
                    <View style={ loginStyles.buttonContainer }>
                        <TouchableOpacity
                            activeOpacity={ 0.8 }
                            style={ loginStyles.button }
                            onPress={ onRegister }
                        >
                            <Text style={ loginStyles.buttonText } >Crear cuenta</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Crear una nueva cuenta */}
                    <TouchableOpacity
                        onPress={ () => navigation.replace('LoginScreen') }
                        activeOpacity={ 0.8 }
                        style={ loginStyles.buttonReturn }
                    >
                        <Text style={ loginStyles.buttonText  }>Login</Text>
                    </TouchableOpacity>

                </View>
                
            </KeyboardAvoidingView>
        </>
    )
}
