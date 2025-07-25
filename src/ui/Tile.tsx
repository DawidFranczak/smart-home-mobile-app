import {StyleSheet, View, ViewStyle} from "react-native";

interface ITileProps {
    children: React.ReactNode
    type?: "blue" | "danger"
    extraStyles?: ViewStyle
}
export default function Tile ({children, type="blue", extraStyles,}:ITileProps) {
    return <View style={[styles.tile, styles[type], extraStyles]}>{children}</View>
}

const styles = StyleSheet.create({
    tile: {
        position: 'relative',
        borderRadius: 4,
        padding: 24,
        backgroundColor: '#0097a7',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    tileHovered: {
        transform: [{ translateY: -2 }],
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 6,
    },
    tilePressed: {
        transform: [{ translateY: 0 }],
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    blue: {
        backgroundColor: '#0097a7',
    },
    danger: {
        backgroundColor: '#c53030',
    },
});