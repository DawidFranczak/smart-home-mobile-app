import {StyleSheet, Text, View} from "react-native";
import variables from "@/src/styles/variables";

interface ITimeRangeProps {
    start :string,
    end :string
}
const formatDate = (date: string) => {
    if (date.length > 5) return date.slice(0, 5);
    return date;
};
export default function TimeRange({start,end}:ITimeRangeProps){
    return(
        <View style={styles.times}>
            <Text style={styles.time}>{formatDate(start)}</Text>
            <Text style={styles.arrow}>→</Text>
            <Text style={styles.time}>{formatDate(end)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    times: {
        flex:1,
        alignItems: "center",
        flexDirection: "row",
        gap: variables.spacing.xs,
    },

    time: {
        fontSize: variables.typography.fontSize.xs,
        fontWeight: 600,
        color: variables.colors.accentPrimary,
        fontFamily: variables.typography.fontFamily,
        paddingVertical: variables.spacing.xs,
        paddingHorizontal:variables.spacing.sm,
        backgroundColor: variables.colors.glassBg,
        borderRadius: variables.borderRadius.sm,
        borderColor: variables.colors.accentPrimary,
        borderStyle: "solid",
        borderWidth: 1,
        textAlign: "center",
    },
    arrow: {
        fontSize:variables.typography.fontSize.xs,
        color: variables.colors.accentTertiary,
        fontWeight: "bold"
    }
})