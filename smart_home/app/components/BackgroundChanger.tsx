import React, { useEffect, useRef, useState } from "react";
import { Animated, ImageBackground, StyleSheet, View } from "react-native";
import { useRoute } from "@react-navigation/native";
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
  const route = useRoute();
  const [currentBg, setCurrentBg] = useState(backgrounds[route.name] || null);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const pathName = usePathname();
  const screenName = pathName.split("/")[1];
  useEffect(() => {
    let newBg = backgrounds[screenName];
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
    <ImageBackground source={currentBg} style={styles.background}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        {children}
      </Animated.View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  abc: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default BackgroundChanger;
