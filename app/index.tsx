import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  interpolateColor,
  useDerivedValue,
} from "react-native-reanimated";
import  { GlassButton } from "../components/GlassButton";

const ITEM_HEIGHT = 80;
const MARGIN_TOP = 40;
const BOTTOM = 30;
const ITEM_FULL_HEIGHT = ITEM_HEIGHT + 8;
const screenHeight = Dimensions.get("window").height;

const generateRandomText = () => {
  const words = [
    "Glassmorphism", "BlurView", "Opacity", "Intensity", "Translucent",
    "Refraction", "Smooth", "Animated", "Reanimated", "SharedValue",
    "Interpolation", "DerivedValue", "Gesture", "ReactNative", "UI",
    "Fluid", "Spring", "withTiming", "Framerate", "Layout",
    "Motion", "Reflected", "VisualFX", "Dynamic", "Pixelated",
  ];
  const length = Math.floor(Math.random() * 10) + 3;
  return Array.from({ length }, () => words[Math.floor(Math.random() * words.length)]).join(" ");
};

const lightColors = ["#e3f2fd", "#bbdefb", "#90caf9", "#64b5f6", "#42a5f5"];
const darkColors = ["#263238", "#37474f", "#455a64", "#546e7a", "#607d8b"];

const getRandomColor = (type: "light" | "dark") =>
  type === "light"
    ? lightColors[Math.floor(Math.random() * lightColors.length)]
    : darkColors[Math.floor(Math.random() * darkColors.length)];

const DATA = Array.from({ length: 1000 }, (_, i) => {
  const bgColorType = Math.random() > 0.5 ? "light" : "dark";
  return {
    id: i.toString(),
    text: generateRandomText(),
    bgColorType,
    bgColor: getRandomColor(bgColorType),
  };
});

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default function App() {
  const blurAmount = useSharedValue(40);

  const leftRadiusRight = useSharedValue(30);
  const rightRadiusLeft = useSharedValue(30);
  const rightBorderLeftWidth = useSharedValue(2);

  const leftButtonRight = useSharedValue(10);
  const rightButtonLeft = useSharedValue(10);

  const leftWrapperRightRadius = useSharedValue(30);
  const rightWrapperLeftRadius = useSharedValue(30);

  const scrollY = useSharedValue(0);

  const animateFromLeft = () => {
    blurAmount.value = withSpring(20);
    leftRadiusRight.value = withTiming(5);
    rightRadiusLeft.value = withTiming(5);
    rightBorderLeftWidth.value = withSpring(0);
    rightButtonLeft.value = withSpring(10);
    leftButtonRight.value = withSpring(-22);
    leftWrapperRightRadius.value = withTiming(0);
    rightWrapperLeftRadius.value = withTiming(0);
  };

  const animateFromRight = () => {
    blurAmount.value = withSpring(20);
    leftRadiusRight.value = withTiming(5);
    rightRadiusLeft.value = withTiming(0);
    rightBorderLeftWidth.value = withSpring(0);
    rightButtonLeft.value = withSpring(-22);
    leftButtonRight.value = withSpring(10);
    leftWrapperRightRadius.value = withTiming(0);
    rightWrapperLeftRadius.value = withTiming(0);
  };

  const resetAnimation = () => {
    blurAmount.value = withSpring(40);
    leftRadiusRight.value = withSpring(30);
    rightRadiusLeft.value = withSpring(30);
    rightBorderLeftWidth.value = withSpring(2);
    leftButtonRight.value = withSpring(10);
    rightButtonLeft.value = withSpring(10);
    leftWrapperRightRadius.value = withSpring(30);
    rightWrapperLeftRadius.value = withSpring(30);
  };

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const STATUS_BAR_HEIGHT = MARGIN_TOP + BOTTOM;

  const progress = useDerivedValue(() => {
    let position = scrollY.value + screenHeight - STATUS_BAR_HEIGHT;
    const contentHeight = DATA.length * ITEM_FULL_HEIGHT;
    position = Math.min(position, contentHeight - 1);

    let index = Math.floor(position / ITEM_FULL_HEIGHT);
    index = Math.min(Math.max(index, 0), DATA.length - 1);

    const bgType = DATA[index].bgColorType;
    return withTiming(bgType === "dark" ? 1 : 0, { duration: 200 });
  });

  const darkOpacity = useAnimatedStyle(() => ({
    opacity: progress.value,
  }));

  const lightOpacity = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
  }));

  const buttonTextAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      ["rgb(0, 0, 0)", "rgb(255, 255, 255)"]
    );
    return { color };
  });

  const animatedLeftStyle = useAnimatedStyle(() => ({
    right: leftButtonRight.value,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: leftRadiusRight.value,
    borderBottomRightRadius: leftRadiusRight.value,
  }));

  const animatedRightStyle = useAnimatedStyle(() => ({
    left: rightButtonLeft.value,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: rightRadiusLeft.value,
    borderBottomLeftRadius: rightRadiusLeft.value,
    borderLeftWidth: rightBorderLeftWidth.value,
  }));

  const animatedLeftWrapperStyle = useAnimatedStyle(() => ({
    borderTopRightRadius: leftWrapperRightRadius.value,
    borderBottomRightRadius: leftWrapperRightRadius.value,
  }));

  const animatedRightWrapperStyle = useAnimatedStyle(() => ({
    borderTopLeftRadius: rightWrapperLeftRadius.value,
    borderBottomLeftRadius: rightWrapperLeftRadius.value,
  }));

  return (
    <View style={styles.container}>
      <AnimatedFlatList
        data={DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: item.bgColor }]}>
            <Text style={{ color: item.bgColorType === "dark" ? "#fff" : "#000" }}>
              {item.text}
            </Text>
          </View>
        )}
        initialNumToRender={20}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      />

      <View style={styles.buttonContainer}>
        <GlassButton
          label="Left Glass"
          onTouchStart={animateFromRight}
          onTouchEnd={resetAnimation}
          containerStyle={animatedLeftStyle}
          wrapperStyle={animatedLeftWrapperStyle}
          lightOpacity={lightOpacity}
          darkOpacity={darkOpacity}
          textStyle={buttonTextAnimatedStyle}
          blurAmount={blurAmount}
        />

        <GlassButton
          label="Right Glass"
          onTouchStart={animateFromLeft}
          onTouchEnd={resetAnimation}
          containerStyle={animatedRightStyle}
          wrapperStyle={animatedRightWrapperStyle}
          lightOpacity={lightOpacity}
          darkOpacity={darkOpacity}
          textStyle={buttonTextAnimatedStyle}
          blurAmount={blurAmount}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: MARGIN_TOP,
  },
  item: {
    height: ITEM_HEIGHT,
    padding: 10,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 4,
  },
  buttonContainer: {
    position: "absolute",
    bottom: BOTTOM,
    right: 30,
    flexDirection: "row",
  },
});
