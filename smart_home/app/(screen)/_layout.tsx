import { Slot } from "expo-router";
import Navbar from "../../src/components/Navbar";
import { ScrollView, StyleSheet, View } from "react-native";
export default function _layout() {
  return (
    <>
      <Slot />
      <Navbar />
    </>
  );
}
