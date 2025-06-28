import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import ButtonContainer from "../ui/ButtonContainer";
import Button from "../ui/Button";
import InputText from "../ui/InputText";
import color from "../styles/color";

interface ChangeNameFormProps {
  onClose: () => void;
  onConfirm: (name: string) => void;
}

export default function ChangeNameForm({
  onClose,
  onConfirm,
}: ChangeNameFormProps) {
  const [inputVisible, setInputVisible] = useState(false);
  const [name, setName] = useState<string>("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setInputVisible(true);
      inputRef.current?.focus();
    }, 200);
    return () => clearTimeout(timeout);
  }, []);

  function handleClose() {
    onClose();
  }

  return (
    <View style={styles.container}>
      {inputVisible && (
        <InputText
          ref={inputRef}
          inputStyle={styles.input}
          placeholder="Podaj nowe nazwe"
          value={name}
          onChange={setName}
          autoFocus={true}
        />
      )}
      <ButtonContainer style={styles.buttonContainer}>
        <Button onPress={() => onConfirm(name)}>Zapisz</Button>
        <TouchableOpacity onPress={handleClose} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Anuluj</Text>
        </TouchableOpacity>
      </ButtonContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "80%",
    flexDirection: "column",
    padding: 15,
  },
  input: {
    textAlign: "left",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cancelButton: {
    backgroundColor: color.button.danger,
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: color.text.primary,
    fontWeight: "bold",
  },
});
