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
  const seledtedStyle = selected
    ? { ...styles.image, ...styles.selected }
    : styles.image;
  return (
    <Link asChild href={url}>
      <TouchableOpacity style={styles.container}>
        {image && <Image style={seledtedStyle} source={image} />}
        <Text style={[styles.text, textStyle]}>{text}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#0ff",
    fontSize: 12,
  },
  image: {
    width: 25,
    height: 25,
  },
  selected: {
    width: 35,
    height: 35,
  },
});
