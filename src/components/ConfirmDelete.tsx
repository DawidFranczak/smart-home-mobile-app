import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  Modal,
} from "react-native";
import color from "../styles/color";
import ButtonContainer from "../ui/containers/ButtonContainer";

interface ConfirmDeleteProps {
  onConfirm: () => void;
  onCancel: () => void;
  name?: string;
  style?: ViewStyle;
  visible: boolean;
}

export default function ConfirmDelete({
  name,
  onConfirm,
  onCancel,
  visible,
}: ConfirmDeleteProps) {
  return (
    <Modal
      animationType="fade"
      visible={visible}
      backdropColor="rgba(0, 0, 0, 0.6)"
      onRequestClose={onCancel}
    >
      <View style={styles.container}>
        <Text style={styles.text}>
          Czy na pewno chcesz usunąć <Text style={styles.bold}>{name}</Text>?
        </Text>
        <ButtonContainer style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.accept]}
            onPress={onConfirm}
          >
            <Text style={styles.buttonText}>Tak</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.cancel]}
            onPress={onCancel}
          >
            <Text style={styles.buttonText}>Nie</Text>
          </TouchableOpacity>
        </ButtonContainer>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "red",
    alignItems: "center",
    justifyContent: "center",
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
    justifyContent: "center",
    gap: 50,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  accept: {
    backgroundColor: color.button.danger,
  },
  cancel: {
    backgroundColor: color.button.background,
  },
  buttonText: {
    color: color.text.primary,
    fontSize: 16,
    textAlign: "center",
  },
});
