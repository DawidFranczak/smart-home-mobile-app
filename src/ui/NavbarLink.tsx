import { Link } from "expo-router";
import { usePathname } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import INavbarLink from "../interfaces/INavbarLink";

export default function NavbarLink({
  image,
  text,
  url,
  textStyle,
}: INavbarLink) {
  const pathName = usePathname();
  const selected = pathName === url;
  const selectedStyle = selected
    ? { ...styles.image, ...styles.selected }
    : styles.image;
  return (
    <Link asChild href={url}>
      <TouchableOpacity style={styles.container}>
        {image && <Image style={selectedStyle} source={image} />}
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  text: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
  },
  image: {
    width: 25,
    height: 25,
    marginBottom: 4,
  },
  selected: {
    width: 35,
    height: 35,
  },

});
