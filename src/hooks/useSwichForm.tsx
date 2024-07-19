import { View, Text } from 'react-native'
import React, { useState } from 'react'

// interface Props {
//   isOn : boolean
// }

const useSwichForm = ( isOn: boolean, OnChange:(value:boolean) => void ) => {
    const [isEnabled, setIsEnabled] = useState(isOn);

    const toggleSwitch = () => {
      setIsEnabled((previousState: any) => !previousState);
      OnChange(!isEnabled)
    }
  
  return{
    isEnabled,
    setIsEnabled,
    toggleSwitch

  }
}

export default useSwichForm