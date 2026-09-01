import { Redirect } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useAuth } from "../hooks/useAuth";
import { LoginScreen } from "../screens/LoginScreen";

export default function HomeScreen() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isAuthenticated) {
    return <Redirect href="/profile" />;
  }

  return <LoginScreen />;
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
