import {Pressable, StyleSheet, Text} from "react-native";
import {useState} from "react";

interface IEventButtonProps {
    onPress: () => void;
    type: "click" | "hold"
    extraStyles?: string;
    disabled?: boolean;
    children?: React.ReactNode
}
export default function EventButton({ onPress, extraStyles, type, disabled, children }: IEventButtonProps) {
    const [pressed, setPressed] = useState(false);
    return  <Pressable
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        disabled={disabled}
        onPress={onPress}
        style={({ pressed: isPressing }) => [
            styles.base,
            type === "hold" ? styles.hold : styles.click,
            disabled && styles.disabled,
            (pressed || isPressing) && styles.pressed,
        ]}
    >
        <Text style={styles.text}>{children}</Text>
    </Pressable>
}

const styles = StyleSheet.create({
    base: {
        flex: 1,
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00bcd4',
        borderWidth: 1,
        borderColor: '#00ffff',
        shadowColor: '#00ffff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
    },
    hold: {
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    click: {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderLeftWidth: 0,
    },
    pressed: {
        transform: [{ translateY: 2 }],
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        shadowOpacity: 0.2,
        backgroundColor: "#004499",
    },
    disabled: {
        backgroundColor: "#999999",
        shadowOpacity: 0.1,
    },
    text: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
    },
});