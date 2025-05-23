import React, { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { View, Text } from "react-native";
import { useRouter } from "expo-router";

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { invalidToken } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (invalidToken) {
      router.replace("/Login");
    }
  }, [invalidToken, router]);

  if (invalidToken) {
    return (
      <View>
        <Text>Redirecting...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* <CacheUpdater /> */}
      {children}
    </View>
  );
};

export default RequireAuth;
