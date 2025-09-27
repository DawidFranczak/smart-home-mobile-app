import {StyleSheet, View, ViewStyle} from "react-native";
import variables from "@/src/styles/variables";

export default function TilesContainer({ children ,style}: { children: React.ReactNode,style?:ViewStyle}) {
    return <View style={[styles.tilesContainer, style]}>{children}</View>;
}

const styles = StyleSheet.create({
    tilesContainer: {
        display: "flex",
        padding:variables.spacing.md,
        gap:variables.spacing.md
    },
});