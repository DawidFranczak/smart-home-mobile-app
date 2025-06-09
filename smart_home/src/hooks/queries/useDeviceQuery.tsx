import { useQuery } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "@/src/const/api";
import { IDevice } from "@/src/interfaces/IDevice";

export default function useDeviceQuery() {
  const { readData } = useFetch();
  const { data } = useQuery({
    queryKey: ["device"],
    queryFn: () => readData(api.device),
    staleTime: 10 * 60 * 1000,
  });
  return { status: data?.status, deviceData: data?.data as IDevice[] };
}
