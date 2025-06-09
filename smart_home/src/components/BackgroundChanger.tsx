import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ImageBackground, StyleSheet, View } from "react-native";
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

  useEffect(() => {
    const newBg = backgrounds[screenName] || backgrounds.Home;
    setCurrentBg(newBg);
  }, [screenName]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={currentBg} style={styles.background} />
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
