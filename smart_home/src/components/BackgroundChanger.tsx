import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Animated, ImageBackground, StyleSheet, View } from "react-native";
import { usePathname } from "expo-router";

const backgrounds: Record<string, any> = {
  Home: require("../../assets/images/home_bg.png"),
  Login: require("../../assets/images/login_full_hd_bg.png"),
  Registration: require("../../assets/images/login_full_hd_bg.png"),
  Room: require("../../assets/images/rooms_bg.png"),
  Aquarium: require("../../assets/images/aquariums_bg.png"),
  Rfid: require("../../assets/images/rfid_bg.png"),
  Lamp: require("../../assets/images/lamps_bg.png"),
  Router: require("../../assets/images/router_bg.png"),
  More: require("../../assets/images/settings_bg.png"),
};
const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);
const BackgroundChanger: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathName = usePathname();
  const screenName = pathName.split("/")[1] || "Login";
  const [currentBg, setCurrentBg] = useState(
    backgrounds[screenName] || backgrounds.Home
  );
  const [prevBg, setPrevBg] = useState(backgrounds.Login);
  const oppacityIn = useRef(new Animated.Value(0)).current;
  const oppacityOut = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const newBg = backgrounds[screenName] || backgrounds.Login;
    if (currentBg === newBg) return;
    setCurrentBg(newBg);
    setPrevBg(currentBg);
    oppacityIn.setValue(0);
    oppacityOut.setValue(1);
    Animated.timing(oppacityIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    Animated.timing(oppacityOut, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [screenName]);
  return (
    <SafeAreaView style={styles.container}>
      <AnimatedImageBackground
        source={prevBg}
        style={[styles.background, { opacity: oppacityOut }]}
      />
      <AnimatedImageBackground
        source={currentBg}
        style={[styles.background, { opacity: oppacityIn }]}
      />
      <View style={styles.overlay}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
  },
});

export default BackgroundChanger;
