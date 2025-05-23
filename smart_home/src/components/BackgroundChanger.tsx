import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Animated, ImageBackground, StyleSheet } from "react-native";
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
};

const BackgroundChanger: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathName = usePathname();
  const screenName = pathName.split("/")[1] || "Login";
  const [currentBg, setCurrentBg] = useState(
    backgrounds[screenName] || backgrounds.Home
  );
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const newBg = backgrounds[screenName] || backgrounds.Home;
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setCurrentBg(newBg);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  }, [screenName]);

  return (
    <SafeAreaView style={styles.container} edges={["top", "bottom"]}>
      <ImageBackground source={currentBg} style={styles.background}>
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          {children}
        </Animated.View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
});

export default BackgroundChanger;
