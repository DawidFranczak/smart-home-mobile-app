import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import { Slot } from "expo-router";
import { AuthProvider } from "@/src/context/AuthContext";
import {StyleSheet, View} from "react-native";
import * as SystemUI from "expo-system-ui";
import React, {useEffect} from "react";
const queryClient = new QueryClient();

export default function _layout() {
  useEffect(() => {
    SystemUI.setBackgroundColorAsync("#0a0e1a");
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <Slot />
          </SafeAreaView>
        </SafeAreaProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0e1a",
    marginBottom: 50,
  },
})