import { useQuery } from "@tanstack/react-query";
import useFetch from "@/src/hooks/useFetch";
import CacheKey from "@/src/const/cacheKey";
import {api} from "@/src/const/api";
import {useAuth} from "@/src/context/AuthContext";

export default function usePrefetchRoomQuery() {
  const { access } = useAuth();
  const { readData } = useFetch();
  const { data,isLoading,isError } = useQuery({
    queryKey: [CacheKey.ROOMS],
    queryFn: () => readData(api.room),
    staleTime: 10 * 60 * 1000,
    enabled:!!access
  });
  return {
    status: data?.status,
    roomData: data?.data,
    isLoading,
    isError
  };
}
