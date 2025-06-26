import INavbarLink from "@/src/interfaces/INavbarLink";
import NavbarLink from "@/src/ui/NavbarLink";
import { FlatList, StyleSheet, View } from "react-native";
export default function More() {
  const data: INavbarLink[] = [
    { text: "Wyloguj", url: "/Logout" },
    { text: "Zmiana hasła", url: "/More/ChangePassword" },
  ];

  return (
    <FlatList<INavbarLink>
      numColumns={2}
      data={data}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <NavbarLink textStyle={styles.text} text={item.text} url={item.url} />
        </View>
      )}
      keyExtractor={(_, index) => index.toString()}
    />
  );
}
const styles = StyleSheet.create({
  card: {
    flex: 1 / 2,
    margin: 5,
    aspectRatio: 2 / 1,
    backgroundColor: "black",
    alignContent: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 22,
  },
});
