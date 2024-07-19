import { useRef } from "react";
import { Animated, Easing, PanResponder } from "react-native";

export const useAnimation = () => {
    const opacity = useRef(new Animated.Value(0)).current;
    const position = useRef(new Animated.Value(0)).current;
    const pan = useRef(new Animated.ValueXY()).current;

    const FadeInt = () => {
        Animated.timing(
            opacity,
            {
                toValue: 1,
                duration: 500,
                useNativeDriver: true
            }
        ).start();


    }
    const FadeOut = () => {
        Animated.timing(
            opacity,
            {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }
        ).start();
    }

    const startMovingPosition = (initPosition: number = -100, duration=300) => {
        position.setValue(initPosition)
        Animated.timing(
            position,
            {
              toValue:0,
              duration,
              useNativeDriver: true,
            //   easing: Easing.bounce
            }
          ).start();
    }
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event(
          [
            null,
            {
              dx: pan.x,
              dy: pan.y,
            },
          ],
          { useNativeDriver: true } // <-- Agrega las opciones aquí
        ),
        onPanResponderRelease: () => {
          Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: true }).start();
        },
      });



    return {
        pan,
        opacity,
        position,
        FadeInt,
        FadeOut,
        startMovingPosition,
        panResponder
    }
}

