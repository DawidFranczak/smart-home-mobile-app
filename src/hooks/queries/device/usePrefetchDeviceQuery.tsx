import { useQuery } from "@tanstack/react-query";
import useFetch from "@/src/hooks/useFetch";
import CacheKey from "@/src/const/cacheKey";
import {api} from "@/src/const/api";
import {IDevice} from "@/src/interfaces/IDevice";
import {useAuth} from "@/src/context/AuthContext";

export default function usePrefetchDeviceQuery() {
  const { access } = useAuth();
  const { readData } = useFetch();
  const { data,isLoading,isError } = useQuery({
    queryKey: [CacheKey.DEVICES],
    queryFn: () => readData(api.device),
    staleTime: 10 * 60 * 1000,
    enabled:!!access
  });
  return { status: data?.status, deviceData: data?.data as IDevice[],isLoading,isError };
}
