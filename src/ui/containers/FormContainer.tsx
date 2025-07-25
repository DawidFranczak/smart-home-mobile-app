import {StyleSheet, View, ViewStyle} from "react-native";
import variables from "@/src/styles/variables";

interface FormContainerProps{
    children: React.ReactNode,
    extraStyle?: ViewStyle
}
export default function FormContainer({children ,extraStyle}: FormContainerProps) {
    return (
        <View style={[styles.container, extraStyle]}>
            <View style={styles.topAccent}></View>
            {children}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        gap: variables.spacing.lg,
        borderRadius: variables.borderRadius.xxl,
        paddingHorizontal: variables.spacing.xxl,
        paddingVertical: variables.spacing.xxl,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderWidth:2,
        borderStyle:"solid",
        borderColor:"rgba(59, 130, 246, 0.3)",
        boxShadow:
           `0 0 40px rgba(59, 130, 246, 0.4),
            0 8px 32px rgba(0, 0, 0, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.1)`,
        backdropFilter: "blur(20px)",
        overflow: "hidden",
    },
    topAccent: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "200%",
        height: 4,
        backgroundColor: variables.colors.accentSecondary,
        borderRadius: variables.borderRadius.xxl,
        zIndex: 1,
        boxShadow: "0 0 10px var(--accent-secondary)",
    }
});
