import { Image, StyleSheet, ImageStyle } from "react-native";

interface RoomVisibilityProps {
  visibility: "public" | "private";
  style?: ImageStyle;
}

export default function RoomVisibility({
  visibility,
  style,
}: RoomVisibilityProps) {
  const imgSource = visibility
    ? require("../../assets/images/lock_unlocked.png")
    : require("../../assets/images/lock_locked.png");
  return <Image style={[styles.image, style]} source={imgSource} />;
}
const styles = StyleSheet.create({
  image: {
    width: 24,
    height: 24,
  },
});
