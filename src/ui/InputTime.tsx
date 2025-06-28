import React, { useState, useEffect } from "react";
import { View, StyleSheet, ViewStyle, Pressable } from "react-native";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Text } from "@react-navigation/elements";
import color from "../styles/color";
interface InputTimeProps {
  initialTime: string;
  onChange: (time: string) => void;
  extraStyle?: ViewStyle;
}

const InputTime = ({ initialTime, onChange, extraStyle }: InputTimeProps) => {
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
      <Pressable style={styles.input} onPress={openPicker}>
        <Text style={styles.text}>
          {dateObj.toISOString().split("T")[1].slice(0, 5)}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 5,
  },
  input: {
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#00FFFF",
    backgroundColor: "#1a2a44dd",
    color: "#00FFFF",
    padding: 5,
    fontSize: 18,
    width: "100%",
  },
  text: {
    width: "100%",
    textAlign: "center",
    color: color.text.primary,
  },
});

export default InputTime;
