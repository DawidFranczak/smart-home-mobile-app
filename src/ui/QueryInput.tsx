import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Animated,
} from "react-native";

interface IQueryInputProps {
  onChange: (value: string) => void;
  extraStyle?: ViewStyle;
}

export default function QueryInput ({ onChange, extraStyle }: IQueryInputProps) {
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
      toValue: isExpanded ? 40 : 150,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    setIsExpanded((prev) => !prev);
  }

  return (
      <View style={[{ width: 150 },extraStyle]}>
        <Animated.View
          style={[styles.container, { width: animatedWidth }]}
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
      </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#00ffff',
    backgroundColor: '#1a2a44',
    padding: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00ffff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
    overflow: 'hidden',
  },
  input: {
    width: 0,
    padding: 0,
    color: '#00ffff',
    backgroundColor: 'transparent',
    borderWidth: 0,
    fontSize: 14,
    fontWeight: '500',
    textShadowColor: 'rgba(0, 255, 255, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
    opacity: 0,
    transform: [{ translateX: 20 }],
  },
  expandedInput: {
    width: '80%',
    paddingLeft: 15,
    paddingRight: 15,
    opacity: 1,
    transform: [{ translateX: 0 }],
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: '#00ffff',
    marginRight: 0,
  },
  expandedSearchIcon: {
    marginRight: 10,
  },
  active: {
    shadowOpacity: 0.6,
    shadowRadius: 25,
  },
  typing: {
    borderColor: '#00ff88',
    shadowColor: '#00ff88',
    shadowOpacity: 0.4,
    shadowRadius: 20,
  },
  typingInput: {
    color: '#00ff88',
    textShadowColor: 'rgba(0, 255, 136, 0.6)',
    textShadowRadius: 8,
  },
  typingSearchIcon: {
    tintColor: '#00ff88',
  },
});

