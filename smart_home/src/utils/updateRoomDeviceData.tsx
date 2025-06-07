import { QueryClient } from "@tanstack/react-query";
import { IDevice } from "../interfaces/IDevice";
import { IRoom } from "../interfaces/IRoom";

export default function updateRoomDeviceData(
  queryClient: QueryClient,
  response: { status: number; data: IDevice }
) {
  const roomId = response.data.room;
  const oldData = queryClient.getQueryData(["room", roomId]) as {
    status: number;
    data: IRoom;
  };
  if (!oldData) return;
  const oldRoomData = oldData.data;
  const updatedDevices = oldRoomData.device.map((device) =>
    device.id === response.data.id ? response.data : device
  );
  const newRoomData = { ...oldRoomData, device: updatedDevices };
  queryClient.setQueryData(["room", roomId], {
    status: response.status,
    data: newRoomData,
  });
}
