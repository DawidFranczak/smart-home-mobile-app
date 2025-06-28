import { View, StyleSheet } from "react-native";
import NavbarLink from "../ui/NavbarLink";

export default function Navbar() {
  return (
    <View style={styles.container}>
      <NavbarLink
        image={require("../../assets/images/dashboard.png")}
        text={"Pulpit"}
        url="/Home"
      />
      <NavbarLink
        image={require("../../assets/images/room.png")}
        text={"Pokoje"}
        url="/Room"
      />
      <NavbarLink
        image={require("../../assets/images/device.png")}
        text={"Urzadzenia"}
        url="/Device"
      />
      <NavbarLink
        image={require("../../assets/images/3dot.png")}
        text={"Wiecej"}
        url="/More"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
    backdropFilter: "blur(1px)",
    borderColor: "#000",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text: {
    color: "#0ff",
    fontSize: 12,
  },
  image: {
    width: 25,
    height: 25,
  },
  logout: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
});
