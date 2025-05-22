import { Slot } from "expo-router";
import RequireAuth from "../RequireAuth";
import BackgroundChanger from "../components/BackgroundChanger";
import Navbar from "../components/Navbar";
export default function _layout() {
  return (
    <RequireAuth>
      <BackgroundChanger>
        <Slot />
        <Navbar />
      </BackgroundChanger>
    </RequireAuth>
  );
}
