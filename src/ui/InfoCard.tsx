import {StyleSheet, Text, View, ViewStyle} from "react-native";
import variables from "@/src/styles/variables";
interface IInfoCardProps{
    children: React.ReactNode;
    icon?: string;
    style?: ViewStyle
}
export default function InfoCard({icon, children, style}: IInfoCardProps) {
    return (
        <View style={[styles.statMini, style]}>
            { icon && <Text style={styles.icon}>{icon}</Text> }
            <Text style={styles.value}>{children}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    statMini: {
        alignItems: "center",
        justifyContent: "space-around",
        gap: variables.spacing.xs,
        padding: variables.spacing.xs,
        backgroundColor: variables.colors.glassBg,
        borderRadius: variables.borderRadius.md,
        borderWidth: 1,
        borderColor: variables.colors.glassBorder,
        borderStyle: "solid",
    },
    icon: {
        fontSize: variables.typography.fontSize.xs
    },
    value: {
        fontSize: variables.typography.fontSize.xs,
        fontWeight: 600,
        color:variables.colors.accentPrimary,
        fontFamily:variables.typography.fontFamily,
        textAlign: "center"
    }
})