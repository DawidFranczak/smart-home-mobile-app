import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  ViewStyle,
  Animated,
  Dimensions,
} from "react-native";

interface IQueryInputProps {
  onChange: (value: string) => void;
  extraStyle?: ViewStyle;
}

const screenWidth = Dimensions.get("window").width;

const QueryInput = ({ onChange, extraStyle }: IQueryInputProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const animatedWidth = useRef(new Animated.Value(40)).current;

  function handleIconClick() {
    if (inputRef.current && !isExpanded) {
      inputRef.current.focus();
    } else {
      inputRef.current?.blur();
    }

    Animated.timing(animatedWidth, {
      toValue: isExpanded ? 40 : screenWidth,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    setIsExpanded((prev) => !prev);
  }

  return (
    <Animated.View
      style={[styles.container, extraStyle, { width: animatedWidth }]}
    >
      <TouchableOpacity onPress={handleIconClick}>
        <Image
          source={require("../../assets/images/search.png")}
          style={styles.searchIcon}
        />
      </TouchableOpacity>
      <TextInput
        ref={inputRef}
        style={[styles.input, isExpanded && styles.expandedInput]}
        onChangeText={(text) => onChange(text)}
        placeholder="Search..."
        placeholderTextColor="#00ffff88"
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#00ffff",
    backgroundColor: "#1a2a44dd",
    color: "#00ffff",
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: 0,
    padding: 0,
    color: "#00ffff",
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  expandedInput: {
    width: "100%",
    paddingLeft: 10,
  },
  searchIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
});

export default QueryInput;
