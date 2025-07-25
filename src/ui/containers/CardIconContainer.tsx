import variables from "@/src/styles/variables";
import {StyleSheet, View, ViewStyle} from "react-native";
export default function CardIconContainer({children, extraStyles}:{children: React.ReactNode,extraStyles?:ViewStyle}) {
    return <View style={[styles.container, extraStyles]}>{children}</View>;
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: variables.spacing.sm,
        gap: variables.spacing.sm,
    },
});
