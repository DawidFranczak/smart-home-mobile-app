import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { useRouter } from "expo-router";
import { useMutation } from "@tanstack/react-query";

import { api } from "../const/api";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../context/AuthContext";
import NavbarLink from "../ui/NavbarLink";

export default function Navbar() {
  const { deleteData } = useFetch();
  const { logout } = useAuth();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: () => deleteData(api.logout),
    onSuccess: (response) => {
      logout();
      router.push("/Login");
    },
  });
  async function logoutHandler() {
    mutation.mutate();
  }
  return (
    <View style={styles.container}>
      <NavbarLink
        image={require("../../assets/images/room.png")}
        text={"home"}
        url="/Home"
      />
      <NavbarLink
        image={require("../../assets/images/room.png")}
        text={"pokoje"}
        url="/Room"
      />
      <NavbarLink
        image={require("../../assets/images/router.png")}
        text={"ruter"}
        url="/Router"
      />
      <TouchableOpacity style={styles.logout} onPress={logoutHandler}>
        <Image
          style={styles.image}
          source={require("../../assets/images/logout.png")}
        />
        <Text style={styles.text}>Wyloguj</Text>
      </TouchableOpacity>
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
