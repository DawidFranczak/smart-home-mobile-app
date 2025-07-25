import {useQuery} from "@tanstack/react-query";
import useFetch from "@/src/hooks/useFetch";
import {api} from "@/src/const/api";
interface IHomeCodeResponse {
    data: {code: string,status: number}
}
export default function useHomeCodeQuery() {
    const {readData} = useFetch();
    const {data, status, isLoading} = useQuery<IHomeCodeResponse>({
        queryKey: ["home_code"],
        queryFn: () => readData(api.home),
        staleTime: 30
    })
    return {data, status, isLoading}
}