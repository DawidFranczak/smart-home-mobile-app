import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

interface IQueryInputProps {
  onChange: (value: string) => void;
  extraStyle?: ViewStyle;
}

const QueryInput = ({ onChange, extraStyle }: IQueryInputProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<TextInput>(null);

  function handleIconClick() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setIsExpanded((prev) => !prev);
  }

  return (
    <View style={[styles.container, isExpanded && styles.expanded]}>
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 24,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#00ffff",
    backgroundColor: "#1a2a44dd",
    color: "#00ffff",
    padding: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  expanded: {
    width: 150,
  },
  input: {
    width: 0,
    padding: 0,
    color: "#00ffff",
    backgroundColor: "transparent",
    borderWidth: 0,
    outline: "none",
  },
  expandedInput: {
    width: 100,
    paddingLeft: 10,
  },
  searchIcon: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
});

export default QueryInput;
