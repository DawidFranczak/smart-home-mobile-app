import {useMutation} from "@tanstack/react-query";
import useFetch from "@/src/hooks/useFetch";
import {api} from "@/src/const/api";

export default function useHomeMutation() {
    const {updateData, deleteData} = useFetch();

    function updateHome() {
        return useMutation({
            mutationFn: (code: string) => updateData(api.home, {code})
        })
    }
    function deleteHome() {
        return useMutation({
            mutationFn: () => deleteData(api.home)
        })
    }
    return {updateHome,deleteHome}
}