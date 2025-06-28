import { useQuery } from "@tanstack/react-query";
import { api } from "../../../src/const/api";
import useFetch from "../useFetch";
import { IButton } from "@/src/interfaces/IButton";

export default function useButtonQuery(id: number | undefined) {
  const { readData } = useFetch();
  const endpoint = id ? `${api.button}${id}/` : api.button;
  const key = id ? ["button", id] : ["button"];
  const { data } = useQuery({
    queryKey: key,
    queryFn: () => readData(endpoint),
    staleTime: 10 * 60 * 1000,
  });
  return { status: data?.status, buttonData: data?.data as IButton };
}
