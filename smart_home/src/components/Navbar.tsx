import { View, StyleSheet } from "react-native";
import { useMutation } from "@tanstack/react-query";

import { api } from "../const/api";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../context/AuthContext";
import NavbarLink from "../ui/NavbarLink";

export default function Navbar() {
  const { deleteData } = useFetch();
  const { logout } = useAuth();
  const mutation = useMutation({
    mutationFn: () => deleteData(api.logout),
    onSuccess: () => {
      logout();
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
});
