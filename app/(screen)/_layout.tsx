import { Slot } from "expo-router";
import Navbar from "../../src/components/Navbar";
import CacheUpdater from "@/src/components/CacheUpdater";
export default function _layout() {
  return (
    <>
      <CacheUpdater />
      <Slot />
      <Navbar />
    </>
  );
}
