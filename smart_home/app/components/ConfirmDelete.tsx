import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
} from "react-native";

interface ConfirmDeleteProps {
  onConfirm: () => void;
  onCancel: () => void;
  name?: string;
  extraStyle?: ViewStyle;
}

export default function ConfirmDelete({
  name,
  onConfirm,
  onCancel,
  extraStyle,
}: ConfirmDeleteProps) {
  return (
    <View style={[styles.container]}>
      <Text style={styles.text}>
        Czy na pewno chcesz usunąć <Text style={styles.bold}>{name}</Text>?
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onConfirm}>
          <Text style={styles.buttonText}>Tak</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onCancel}>
          <Text style={styles.buttonText}>Nie</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    color: "red",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 18,
    color: "red",
    marginBottom: 20,
  },
  bold: {
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    backgroundColor: "#f44336",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});
