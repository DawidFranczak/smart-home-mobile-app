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
import Button from "@/src/ui/buttons/Button";
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

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#0f1419',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    fontFamily: 'Inter',
  },
  form: {
    width: '100%',
    flexDirection: 'column',
    gap: 16,
    marginTop: 24,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 16,
    marginVertical: 8,
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter',
  },
  inputFocused: {
    borderColor: '#00ffff',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#00ffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#0f1419',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Inter',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 8,
    fontFamily: 'Inter',
  },
});