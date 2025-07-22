import { useQuery } from "@tanstack/react-query";
import useFetch from "../useFetch";
import {api} from "@/src/const/api";

export default function useUnassignedDeviceQuery() {
  const { readData } = useFetch();
  const { data } = useQuery({
    queryFn: () => readData(api.unassignedDevice),
    queryKey: ["unassignedDevice"],
    staleTime: 10 * 60 * 1000,
  });
  return { status: data?.status, unassignedDeviceData: data?.data };
}
