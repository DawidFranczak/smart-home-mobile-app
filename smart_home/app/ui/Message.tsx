import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface MessageProps {
  children: React.ReactNode;
  type: string;
}

const Message = ({ children, type }: MessageProps) => {
  return (
    <View style={styles.message}>
      <View style={styles.backgroundBlur} />
      <Text style={[styles.messageText, styles[type]]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
  },
  backgroundBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  messageText: {
    margin: 0,
    position: "relative",
    fontSize: 14,
    fontWeight: "bold",
    zIndex: 1,
  },
  error: {
    color: "rgba(255, 0, 0, 0.8)",
  },
  success: {
    color: "rgba(0, 255, 0, 0.8)",
  },
});

export default Message;
