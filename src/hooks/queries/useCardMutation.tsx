import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../useFetch";
import {api} from "@/src/const/api";
import updateDeviceData from "@/src/utils/updateDeviceData";

export default function useCardMutation() {
  const queryClient = useQueryClient();
  const { deleteData, createData } = useFetch();

  function mutationDelete(cardId: number) {
    return useMutation({
      mutationFn: () => deleteData(`${api.card}${cardId}/`),
    });
  }
  function mutationCreate(rfidId: number) {
    return useMutation({
      mutationFn: (name: string) =>
        createData(`${api.card}`, { name, rfid: rfidId }),
      onSuccess: (response) => {
        updateDeviceData(queryClient, response);
      },
    });
  }
  return { mutationDelete, mutationCreate };
}
