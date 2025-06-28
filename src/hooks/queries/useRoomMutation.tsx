import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "@/src/const/api";
interface RoomData {
  name: string;
  visibility: string;
}
export default function useRoomMutation() {
  const { createData } = useFetch();
  const queryClinet = useQueryClient();
  function createRoom() {
    return useMutation({
      mutationFn: (roomData: RoomData) => createData(api.room, roomData),
      onSuccess: () => {
        queryClinet.invalidateQueries({ queryKey: ["room"] });
      },
    });
  }
  return { createRoom };
}
