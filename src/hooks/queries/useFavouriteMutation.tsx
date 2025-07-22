import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetch from "../useFetch";
import updateFavouriteData from "../../utils/updateFavouriteData";
import updateRoomData from "../../utils/updateRoomData";
import IFavouriteData from "@/src/interfaces/IFavouriteData";
import {api} from "@/src/const/api";
import updateDeviceData from "@/src/utils/updateDeviceData";

export default function useFavouriteMutation(
    onClick?: (is_favourite: boolean) => void
) {
  const queryClient = useQueryClient();
  const { updateData } = useFetch();
  return useMutation({
    mutationFn: (data: IFavouriteData) => updateData(api.favourite, data),
    onSuccess: (response, data: IFavouriteData) => {
      updateFavouriteData(queryClient, data, response.status);
      if (data.type === "room") updateRoomData(queryClient, response);
      else if (data.type === "device") updateDeviceData(queryClient, response);
      onClick && onClick(!data.is_favourite);
    },
  });
}
