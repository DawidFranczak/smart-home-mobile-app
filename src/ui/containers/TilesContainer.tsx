import {StyleSheet, View} from "react-native";
import variables from "@/src/styles/variables";

export default function TilesContainer({ children }: { children: React.ReactNode }) {
    return <View style={styles.tilesContainer}>{children}</View>;
}

const styles = StyleSheet.create({
    tilesContainer: {
        display: "flex",
        padding:variables.spacing.md,
        gap:variables.spacing.md
    },
});