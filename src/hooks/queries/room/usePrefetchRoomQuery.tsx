import { useQuery } from "@tanstack/react-query";
import useFetch from "@/src/hooks/useFetch";
import CacheKey from "@/src/const/cacheKey";
import {api} from "@/src/const/api";

export default function usePrefetchRoomQuery() {
  const { readData } = useFetch();
  const { data,isLoading,isError } = useQuery({
    queryKey: [CacheKey.ROOMS],
    queryFn: () => readData(api.room),
    staleTime: 10 * 60 * 1000,
  });
  return {
    status: data?.status,
    roomData: data?.data,
    isLoading,
    isError
  };
}
