import { useQuery } from "@tanstack/react-query";
import useFetch from "../useFetch";
import {api} from "@/src/const/api";
import CacheKey from "@/src/const/cacheKey";

export default function useFavouriteQuery() {
  const { readData } = useFetch();
  const { data, isLoading } = useQuery({
    queryFn: () => readData(api.favourite),
    queryKey: [CacheKey.FAVOURITES],
    staleTime: 10 * 60 * 1000,
  });
  return { status: data?.status, favouriteData: data?.data, isLoading };
}
