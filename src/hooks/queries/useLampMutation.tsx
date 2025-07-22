import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ILamp } from "../../interfaces/ILamp";
import useFetch from "../useFetch";
import updateDeviceData from "@/src/utils/updateDeviceData";
import {api} from "@/src/const/api";

export default function useLampMutation() {
  const { updateData } = useFetch();
  const queryClient = useQueryClient();

  function updateLamp(id: number) {
    return useMutation({
      mutationFn: (newData: ILamp) => updateData(`${api.lamp}${id}/`, newData),
      onSuccess: (response) => {
        updateDeviceData(queryClient, response);
      },
    });
  }

  return { updateLamp };
}
