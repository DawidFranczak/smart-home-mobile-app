import {useMutation, useQueryClient} from "@tanstack/react-query";
import useFetch from "@/src/hooks/useFetch";
import {api} from "@/src/const/api";
import CacheKey from "@/src/const/cacheKey";
import IFavouriteData from "@/src/interfaces/IFavouriteData";
import updateFavouriteData from "@/src/utils/updateFavouriteData";

interface IDeviceUpdate {
  name?: string;
  room?: number|null;
}

export default function useDeviceMutation() {
  const { updateData, deleteData } = useFetch();
  const queryClient = useQueryClient();

  function updateDevice(id: number) {
    return useMutation({
      mutationFn: (data: IDeviceUpdate) =>
        updateData(`${api.device}${id}/`, data),
      onSuccess: async (response) => {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: [CacheKey.ROOMS] }),
          queryClient.invalidateQueries({ queryKey: [CacheKey.DEVICES] }),
          queryClient.invalidateQueries({ queryKey: [CacheKey.UNASSIGNED_DEVICE] }),
        ]);
        const data = {
          type: "device",
          id: response.data.id,
          is_favourite: true
        } as IFavouriteData;
        updateFavouriteData(queryClient, data, response.status);
      },
    });
  }

  function deleteDevice(id: number) {
    return useMutation({
      mutationFn: () => deleteData(`${api.device}${id}/`),
      onSuccess: async () =>{
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: [CacheKey.ROOMS] }),
          queryClient.invalidateQueries({ queryKey: [CacheKey.DEVICES] })
        ]);
      }
    })
  }
  return { updateDevice, deleteDevice };
}
