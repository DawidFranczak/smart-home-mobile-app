import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";

interface ChangeNameFormProps {
  onClose: () => void;
  onConfirm: (name: string) => void;
}

export default function ChangeNameForm({
  onClose,
  onConfirm,
}: ChangeNameFormProps) {
  const [name, setName] = useState<string>("");

  function handleClose() {
    onClose();
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nazwa"
        value={name}
        onChangeText={setName}
      />
      <View style={styles.buttonContainer}>
        <Button title="Zapisz" onPress={() => onConfirm(name)} />
        <TouchableOpacity onPress={handleClose} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Anuluj</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 10,
    padding: 15,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelButton: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "red",
    fontWeight: "bold",
  },
});
