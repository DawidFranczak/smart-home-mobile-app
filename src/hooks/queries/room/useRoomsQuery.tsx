import usePrefetchRoomQuery from "@/src/hooks/queries/room/usePrefetchRoomQuery";
import {IRoom} from "@/src/interfaces/IRoom";

export default function useRoomsQuery(roomsIds:number[]) {
    const {roomData,isLoading,isError} = usePrefetchRoomQuery();
    if (!roomData) return {rooms: [], isLoading, isError};
    return {
        rooms: roomData.filter((room: IRoom) => {
            return roomsIds.includes(room.id);
        }),
        isLoading,
        isError
    }
}