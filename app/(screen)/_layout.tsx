import { Slot } from "expo-router";
import Navbar from "../../src/components/Navbar";
import CacheUpdater from "@/src/components/CacheUpdater";
import DataPrefetcher from "@/src/ui/DataPrefetcher";
export default function _layout() {
  return (
    <>
        <CacheUpdater />
        <DataPrefetcher/>
        <Slot />
        <Navbar />
    </>
  );
}
