import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { Slot } from "expo-router";
import BackgroundChanger from "./components/BackgroundChanger";
import { StatusBar } from "react-native";

export default function _layout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <StatusBar backgroundColor="black" barStyle="light-content" />
        <BackgroundChanger>
          <Slot />
        </BackgroundChanger>
      </AuthProvider>
    </QueryClientProvider>
  );
}
