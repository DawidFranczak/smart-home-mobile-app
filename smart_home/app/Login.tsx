import { useAuth } from "@/src/context/AuthContext";
import useLoginMutation from "@/src/hooks/queries/useLoginMutation";
import ButtonContainer from "@/src/ui/ButtonContainer";
import StyledLink from "@/src/ui/StyledLink";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { login, access, setAccess } = useAuth();
  const mutation = useLoginMutation(setError, setAccess);
  const router = useRouter();
  useEffect(() => {
    if (access) {
      login(access);
      router.replace("/Home");
    }
  }, [login, access]);

  const handleLogin = () => {
    if (username === "" || password === "") {
      Alert.alert("Błąd", "Proszę wypełnić wszystkie pola.");
      return;
    }
    setError(null);
    mutation.mutate({ username, password });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Logowanie</Text>

      <TextInput
        style={styles.input}
        placeholder="Login"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Hasło"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error && <Text style={{ color: "red", marginBottom: 10 }}>{error}</Text>}

      <ButtonContainer style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Zaloguj się</Text>
        </TouchableOpacity>

        <StyledLink to="/Register" type="link">
          Nie masz konta?
        </StyledLink>

        <TouchableOpacity>
          <Text style={styles.link}>Nie pamiętasz hasła?</Text>
        </TouchableOpacity>
      </ButtonContainer>
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 40,
    color: "rgba(0, 200, 255, 1)",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    marginBottom: 15,
    backgroundColor: "white",
    fontSize: 16,
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
  buttonContainer: {
    width: "100%",
    flexDirection: "column",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  link: {
    marginTop: 10,
    color: "#rgba(255, 0, 0, 1)",
    fontSize: 14,
    textAlign: "center",
  },
});
