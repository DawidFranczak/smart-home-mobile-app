import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import updateUnassignedDevice from "../utils/updateUnassignedDevice";
import updateRouterData from "../utils/updateRouterData";
import {websocketUrl} from "@/src/const/urls";
import MessageType from "@/src/const/message_type";
import updateDeviceData from "@/src/utils/updateDeviceData";

export default function CacheUpdater() {
  const [_, setSocket] = useState<WebSocket>();
  const queryClient = useQueryClient();
  useEffect(() => {
    const token = queryClient.getQueryData(["token"]) as {
      status: number;
      token: string;
    };
    if (!token) return;
    const ws = new WebSocket(`${websocketUrl}/ws/user/${token.token}/`);
    ws.onopen = (event) => {
      console.log("open",event);
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.action) {
        case MessageType.UPDATE_ROUTER:
          updateRouterData(queryClient, data.data);
          break;
        case MessageType.UPDATE_DEVICE:
          updateDeviceData(queryClient, data.data);
          break;
        case MessageType.NEW_DEVICE_CONNECTED:
          updateUnassignedDevice(queryClient, data.data);
      }
    };

    ws.onerror = () => {
      //   console.error("Błąd WebSocket:", error);
    };

    ws.onclose = () => {
      //   console.log("Rozłączono z serwerem WebSocket");
    };
    setSocket(ws);

    return () => ws.close();
  }, []);
  return null;
}
