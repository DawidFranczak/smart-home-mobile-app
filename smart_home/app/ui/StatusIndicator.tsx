import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface IStatusIndicatorProps {
  children: React.ReactNode;
  color: string;
}

const StatusIndicator = ({ color, children }: IStatusIndicatorProps) => {
  return (
    <View style={styles.container}>
      <Text>{children}</Text>
      <View style={[styles.dot, { backgroundColor: color }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
});

export default StatusIndicator;
