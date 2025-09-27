import { useQueryClient } from "@tanstack/react-query";
import {useEffect, useRef, useState} from "react";
import updateUnassignedDevice from "../utils/updateUnassignedDevice";
import updateRouterData from "../utils/updateRouterData";
import {websocketUrl} from "@/src/const/urls";
import MessageType from "@/src/const/message_type";
import updateDeviceData from "@/src/utils/updateDeviceData";

export default function CacheUpdater() {
  const socket = useRef<WebSocket>();
  const queryClient = useQueryClient();

  function connect(){
    const token = queryClient.getQueryData(["token"]) as {
      status: number;
      token: string;
    };
    if (!token ) return;
    if (socket.current && socket.current.readyState === WebSocket.OPEN) return;
    const ws = new WebSocket(`${websocketUrl}/ws/user/${token.token}/`);
    ws.onopen = (event) => {
      console.log("open",event);
    };
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.action) {
        case MessageType.UPDATE_ROUTER:
          updateRouterData(queryClient, data.data, data.status);
          break;
        case MessageType.UPDATE_DEVICE:
          updateDeviceData(queryClient, data.data, data.status);
          break;
        case MessageType.NEW_DEVICE_CONNECTED:
          updateUnassignedDevice(queryClient, data.data, data.status);
      }
    };
    ws.onerror = (error) => {
        console.error("Błąd WebSocket:", error);
    };

    ws.onclose = () => {
        console.log("Rozłączono z serwerem WebSocket");
        setTimeout(connect, 5000);
    };

    socket.current = ws;
  }

  useEffect(() => {
    connect();
    return () => { if(socket.current) socket.current.close();};
  }, []);
  return null;
}
