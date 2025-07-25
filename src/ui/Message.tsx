import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";

interface MessageProps {
  children: React.ReactNode;
  type?: "error" | "success" | "info";
  style?: ViewStyle;
  visible?: boolean;
  timeout?: number;
  onTimeout?: () => void
}

const Message = ({ children, style, type ="info" ,timeout =0,onTimeout, visible = true}: MessageProps) => {
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      if (timeout === 0) {
        setShouldRender(true);
        return;
      }
      const timer = setTimeout(() => {
        setShouldRender(false)
        if (onTimeout) {
          onTimeout();
        }
      }, timeout);
      return () => {
        clearTimeout(timer);
      };
    }else {
      setShouldRender(false);
    }
  }, [visible, onTimeout, timeout]);

  if(!shouldRender) return null
  return (
    <View style={style}>
      <Text style={[styles.messageText, styles[type]]}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({

  messageText: {
    margin: 0,
    fontSize: 14,
    fontWeight: "bold",
    zIndex: 1,
    textAlign: "center",
  },
  error: {
    color: "rgba(255, 0, 0, 0.8)",
  },
  info:{
    color: "#0c5460",
  },
  success: {
    color: "rgba(0, 255, 0, 0.8)",
  },
});

export default Message;
