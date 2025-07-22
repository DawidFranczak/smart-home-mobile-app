import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import NavbarLink from "../ui/NavbarLink";

export default function Navbar() {
    return (
        <View style={styles.container}>
            <NavbarLink
                image={require("../../assets/images/dashboard.png")}
                text="Pulpit"
                url="/Home"
            />
            <NavbarLink
                image={require("../../assets/images/room.png")}
                text="Pokoje"
                url="/Room"
            />
            <NavbarLink
                image={require("../../assets/images/device.png")}
                text="Urzadzenia"
                url="/Device"
            />
            <NavbarLink
                image={require("../../assets/images/3dot.png")}
                text="Wiecej"
                url="/More"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 10,
        left: 10,
        right: 10,
        height: 70,
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(20px)",
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.2)",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 8 },
        shadowRadius: 32,
    },
});
