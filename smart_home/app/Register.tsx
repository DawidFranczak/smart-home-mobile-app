import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { api } from "@/src/const/api";
import Button from "@/src/ui/Button";
import Message from "@/src/ui/Message";
import { useRouter } from "expo-router";

interface IErrors {
  empty?: string;
  username?: string;
  password?: string;
  password2?: string;
}

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState<IErrors>({});
  const [status, setStatus] = useState<number | null>(null);
  const router = useRouter();
  if (status === 201) {
    setTimeout(() => {
      router.push("/Login");
    }, 2000);
  }
  async function handleSubmit() {
    const body = {
      username,
      password,
      password2,
    };
    const response = await fetch(api.registration, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "1234",
      },
      body: JSON.stringify(body),
    });
    const responseData = await response.json();
    setStatus(response.status);
    if (response.status === 400) setError(responseData);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Rejestracja</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Login"
          value={username}
          onChangeText={setUsername}
        />
        {status === 400 && error.username && (
          <Message style={styles.message} type="error">
            {error.username}{" "}
          </Message>
        )}
        <TextInput
          style={styles.input}
          placeholder="Hasło"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Powtórz hasło"
          value={password2}
          onChangeText={setPassword2}
          secureTextEntry
        />
        {status === 400 && error.password2 && (
          <Message style={styles.message} type="error">
            {error.password2}
          </Message>
        )}
        <Button
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={handleSubmit}
        >
          Rejestracja
        </Button>
      </View>
      {status === 400 && error?.empty && (
        <Message style={styles.message} type="error">
          {error.empty}
        </Message>
      )}
      {status === 201 && (
        <Message style={styles.message} type="success">
          Rejestracja przebiegła pomyślnie. Za chwilę zostaniesz przekierowany
          na stronę logowania
        </Message>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  form: {
    width: "100%",
    marginTop: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: "white",
    fontSize: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    color: "rgba(0, 200, 255, 1)",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#0066cc",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  message: {},
});
