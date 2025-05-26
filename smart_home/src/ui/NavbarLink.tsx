import { Link } from "expo-router";
import { usePathname } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface NavbarLinkProps {
  image: any;
  text: string;
  url: "/Home" | "/Room" | "/Router" | "/Login";
}
export default function NavbarLink({ image, text, url }: NavbarLinkProps) {
  const pathName = usePathname();
  const selected = pathName === url;
  const style = selected
    ? { ...styles.image, ...styles.selected }
    : styles.image;
  return (
    <Link asChild href={url}>
      <TouchableOpacity style={styles.container}>
        <Image source={image} style={style} />
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
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
