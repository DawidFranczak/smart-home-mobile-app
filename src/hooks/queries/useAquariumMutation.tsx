import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { IAquarium } from "../../interfaces/IAquarium";
import {api} from "@/src/const/api";
import updateDeviceData from "@/src/utils/updateDeviceData";

export default function useAquariumMutation(id: number) {
  const { updateData } = useFetch();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (aquariumData: IAquarium) =>
      updateData(`${api.aquarium}${id}/`, aquariumData),
    onSuccess: (response) => {
      updateDeviceData(queryClient, response);
    },
  });
}
