import { StyleSheet, View, ViewStyle } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import variables from "@/src/styles/variables";
interface SelectProps {
  items: { label: string; value: string }[];
  placeholder: string;
  onChange: (value: string) => void;
  style?: ViewStyle;
}

export default function Select({
  items,
  placeholder,
  onChange,
  style,
}: SelectProps) {
  return (
    <View style={[styles.container, style]}>
      <RNPickerSelect
        items={items}
        onValueChange={(e) => onChange(e)}
        placeholder={{ label: placeholder, value: null }}
        style={{
          inputAndroid: {
            width: "100%",
            height: 40,
            color: "#fff",
            backgroundColor: "#1a2a44dd",
            textAlign: "center",
            borderColor: variables.colors.borderAccent,
            borderWidth:2,
            borderRadius: variables.borderRadius.lg,
            borderStyle:"solid"
          },
        }}
        useNativeAndroidPickerStyle={false}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
