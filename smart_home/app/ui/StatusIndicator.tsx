import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface IStatusIndicatorProps {
  children?: React.ReactNode;
  color: string;
}

const StatusIndicator = ({ color, children }: IStatusIndicatorProps) => {
  return (
    <View style={styles.container}>
      {children && <Text style={styles.tekst}>{children}</Text>}
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
    width: 20,
    height: 20,
    borderRadius: 50,
  },
  tekst: {
    color: "#00ffff",
  },
});

export default StatusIndicator;
