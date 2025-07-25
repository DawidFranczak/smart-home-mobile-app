import { useAuth } from "@/src/context/AuthContext";
import ButtonContainer from "@/src/ui/containers/ButtonContainer";
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
import useLoginMutation from "@/src/hooks/queries/useLoginMutation";

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
  subtitle: {
    fontSize: 16,
    color: '#d1d5db',
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: '400',
    fontFamily: 'Inter',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 16,
    marginBottom: 16,
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'Inter',
  },

  error: {
    color: '#ef4444',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Inter',
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
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
  link: {
    color: '#00ffff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
    fontFamily: 'Inter',
  },
  loading: {
    opacity: 0.7,
  },
});