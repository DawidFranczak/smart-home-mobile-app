import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SystemUI from "expo-system-ui";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Slot } from "expo-router";
import BackgroundChanger from "../src/components/BackgroundChanger";
import { useEffect } from "react";
import { AuthProvider } from "@/src/context/AuthContext";

export default function _layout() {
  const queryClient = new QueryClient();
  useEffect(() => {
    SystemUI.setBackgroundColorAsync("#000000");
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SafeAreaProvider>
          <BackgroundChanger>
            <Slot />
          </BackgroundChanger>
        </SafeAreaProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
