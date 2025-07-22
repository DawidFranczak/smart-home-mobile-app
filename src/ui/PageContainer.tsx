import {StyleSheet, View, ViewStyle} from "react-native";

interface PageContainerProps {
    children: React.ReactNode
    extraStyle?: ViewStyle
}
export default function PageContainer({children, extraStyle}: PageContainerProps) {

    return (
        <View style={[styles.container, extraStyle]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        marginBottom: 40,
    }
})
