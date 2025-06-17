import React from "react";
import {
  StyleSheet,
  View,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
} from "react-native";
import { BlurView } from "expo-blur";
import Animated from "react-native-reanimated";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
const AnimatedPressable = Animated.createAnimatedComponent(View);

interface GlassButtonProps {
  label: string;
  onTouchStart?: (e: GestureResponderEvent) => void;
  onTouchEnd?: (e: GestureResponderEvent) => void;
  containerStyle: StyleProp<ViewStyle>;
  wrapperStyle: StyleProp<ViewStyle>;
  lightOpacity: StyleProp<ViewStyle>;
  darkOpacity: StyleProp<ViewStyle>;
  textStyle: StyleProp<any>;
  blurAmount: { value: number };
}

export const GlassButton: React.FC<GlassButtonProps> = ({
  label,
  onTouchStart,
  onTouchEnd,
  containerStyle,
  wrapperStyle,
  lightOpacity,
  darkOpacity,
  textStyle,
  blurAmount,
}) => {
  return (
    <AnimatedPressable
      style={[styles.floatingButton, containerStyle]}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <Animated.View style={[styles.buttonWrapper, wrapperStyle]}>
        <Animated.View style={[StyleSheet.absoluteFillObject, lightOpacity]}>
          <AnimatedBlurView
            style={StyleSheet.absoluteFillObject}
            tint="extraLight"
            intensity={blurAmount.value}
            experimentalBlurMethod="dimezisBlurView"
          />
        </Animated.View>
        <Animated.View style={[StyleSheet.absoluteFillObject, darkOpacity]}>
          <AnimatedBlurView
            style={StyleSheet.absoluteFillObject}
            tint="dark"
            intensity={blurAmount.value}
            experimentalBlurMethod="dimezisBlurView"
          />
        </Animated.View>
        <Animated.Text style={[styles.buttonText, textStyle]}>
          {label}
        </Animated.Text>
      </Animated.View>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    height: 60,
    padding: 1,
    borderTopWidth: 1.5,
    borderLeftWidth: 1.5,
    borderRadius: 30,
    borderColor: "white",
    overflow: "hidden",
    backgroundColor: "transparent",
    marginLeft: 10,
  },
  buttonWrapper: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    position: "relative",
    paddingHorizontal: 10,
    zIndex: 10,
  },
});

