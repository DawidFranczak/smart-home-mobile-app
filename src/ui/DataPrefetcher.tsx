import usePrefetchDeviceQuery from "@/src/hooks/queries/device/usePrefetchDeviceQuery";
import usePrefetchRoomQuery from "@/src/hooks/queries/room/usePrefetchRoomQuery";

export default function DataPrefetcher() {
    const { deviceData } = usePrefetchDeviceQuery()
    const { roomData } = usePrefetchRoomQuery()

    return null;
}