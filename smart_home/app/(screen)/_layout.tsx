import { Slot } from "expo-router";
import RequireAuth from "../RequireAuth";
import BackgroundChanger from "../components/BackgroundChanger";
export default function _layout() {
  return (
    <RequireAuth>
      <BackgroundChanger>
        <Slot />
      </BackgroundChanger>
    </RequireAuth>
  );
}
