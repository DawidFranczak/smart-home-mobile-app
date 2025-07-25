import {StyleSheet, Text, View, ViewStyle} from "react-native";

interface IPageHeaderProps {
    children?: React.ReactNode
    className?: ViewStyle
    title?: string
    subtitle?: string
}
export default function PageHeader({children, className,title, subtitle}:IPageHeaderProps) {
    return (
        <View style={[styles.pageHeader, className]}>
            {(title || subtitle) && <View>
                { title && <Text style={styles.title}>{title}</Text> }
                { subtitle && <Text style={styles.subtitle}>{subtitle}</Text> }
            </View>}
            <View style={styles.childrenBlock}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        marginBottom: 5,
        backgroundColor: 'rgba(26, 42, 68, 0.6)',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: 'rgba(0, 255, 255, 0.2)',
        width: '100%',
        gap: 15,
    },
    textBlock: {
        flexShrink: 1,
        marginRight: 10,
    },
    childrenBlock: {
        flex: 1,
        alignItems: 'flex-end',
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        color: '#00ffff',
        letterSpacing: 1,
        textAlign: 'left',
    },
    subtitle: {
        fontSize: 11,
        color: 'rgba(255, 255, 255, 0.7)',
        fontWeight: '300',
        textAlign: 'left',
    },
});
