import {useMutation, useQueryClient} from "@tanstack/react-query";
import useFetch from "@/src/hooks/useFetch";
import {api} from "@/src/const/api";
import updateRoomData from "@/src/utils/updateRoomData";
import CacheKey from "@/src/const/cacheKey";
import {IRoom} from "@/src/interfaces/IRoom";

interface IRoomUpdate{
    name?: string;
    visibility?: "PU"|"PR"
}
export default function useRoomMutation(){
    const {updateData, deleteData} = useFetch()
    const queryClient = useQueryClient();
    function updateRoom(id: number){
        return useMutation({
            mutationFn:(data:IRoomUpdate) => updateData(`${api.room}${id}/`, data),
            onSuccess: (response) => {
                updateRoomData(queryClient, response);
            }
        })
    }
    function deleteRoom(id: number){
        return useMutation({
            mutationFn: () => deleteData(`${api.room}${id}/`),
            onSuccess: (_:{status: number}) => {
                const rooms = queryClient.getQueryData([CacheKey.ROOMS]) as {status: number, data: IRoom[]} | undefined;
                if(!rooms) return;
                const newRooms = rooms.data.filter(room => room.id !== id);
                queryClient.setQueryData([CacheKey.ROOMS], {...rooms, data: newRooms});
            }
        })
    }

    return {updateRoom, deleteRoom}
}