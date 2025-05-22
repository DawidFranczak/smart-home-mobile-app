import { Link } from "expo-router";
import { usePathname } from "expo-router";
import { Image, StyleSheet, Text } from "react-native";

interface NavbarLinkProps {
  image: any;
  text: string;
  url: "/Home" | "/Room" | "/Router";
}
export default function NavbarLink({ image, text, url }: NavbarLinkProps) {
  const pathName = usePathname();
  const selected = pathName === url;
  const style = selected
    ? { ...styles.image, ...styles.selected }
    : styles.image;
  return (
    <Link style={styles.container} href={url}>
      <Image source={image} style={style} />
      <Text style={styles.text}>{text}</Text>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
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
    width: 30,
    height: 30,
  },
});
