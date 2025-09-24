import usePrefetchDeviceQuery from "@/src/hooks/queries/device/usePrefetchDeviceQuery";
import {IDevice} from "@/src/interfaces/IDevice";

export default function useDevicesQuery(deviceIds:number[]) {
    const {deviceData, status, isLoading, isError} = usePrefetchDeviceQuery();
    if (!deviceData) return {devices: [], status, isLoading, isError};
    return {
        devices: deviceData.filter((device: IDevice) => deviceIds.includes(device.id)),
        isLoading,
        isError,
        status
    }
}
