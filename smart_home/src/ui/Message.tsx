import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

interface MessageProps {
  children: React.ReactNode;
  type?: "error" | "success";
  style?: ViewStyle;
}

const Message = ({ children, style, type }: MessageProps) => {
  const messageType = type === "error" ? styles.error : styles.success;
  return (
    <View style={[styles.message, style]}>
      <Text style={[styles.messageText, messageType]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  message: {
    overflow: "hidden",
  },
  messageText: {
    margin: 0,
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
