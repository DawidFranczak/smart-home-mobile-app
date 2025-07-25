import React, {useState, useEffect} from "react";
import { View, StyleSheet, ViewStyle, Pressable } from "react-native";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Text } from "@react-navigation/elements";
import color from "../../styles/color";
import variables from "@/src/styles/variables";
interface InputTimeProps {
  initialTime: string;
  onChange: (time: string) => void;
  extraStyle?: ViewStyle;
  label: string
  disabled?: boolean
}

const InputTime = ({ initialTime, onChange, extraStyle,label,disabled=false }: InputTimeProps) => {
  const [data, setData] = useState(initialTime);

  useEffect(() => {
    onChange(data);
  }, [data]);

  const updateTime = (event: DateTimePickerEvent, _?: Date) => {
    if (event.type === "dismissed") return;
    const offsetMs = event.nativeEvent.utcOffset * 60 * 1000;
    const localTimestamp = event.nativeEvent.timestamp + offsetMs;
    const localDate = new Date(localTimestamp);
    setData(localDate.toISOString().split("T")[1].slice(0, 5));
  };
  const openPicker = () => {
    DateTimePickerAndroid.open({
      value: dateObj,
      mode: "time",
      is24Hour: true,
      display: "spinner",
      onChange: updateTime,
    });
  };

  const today = new Date();
  const dateString = today.toISOString().split("T")[0];
  const fullDateTime = `${dateString}T${initialTime}`;
  const dateObj = new Date(fullDateTime);
  return (
    <View style={[styles.container, extraStyle]}>
      <Text style={styles.text}>{label}</Text>
      <Pressable style={styles.input} onPress={openPicker}>
        <Text style={styles.inputText}>
          {dateObj.toISOString().split("T")[1].slice(0, 5)}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    marginTop:variables.spacing.xsm,
    width: "100%",
    paddingHorizontal: variables.spacing.xs,
    paddingVertical: variables.spacing.sm,
    fontSize: variables.typography.fontSize.xl,
    fontWeight: 500,
    fontFamily: variables.typography.fontFamily,
    backgroundColor: variables.colors.primaryBg,
    borderWidth:2,
    borderStyle:"solid",
    borderColor:variables.colors.borderAccent,
    borderRadius:variables.borderRadius.md,
  },
  inputText:{
    color: variables.colors.accentPrimary,
    textAlign: "center",
  },
  text: {
    color: variables.colors.accentPrimary,
    fontSize: variables.typography.fontSize.xl,
    fontWeight: 500,
    fontFamily: variables.typography.fontFamily,
    textAlign: "center",
  },
});

export default InputTime;
