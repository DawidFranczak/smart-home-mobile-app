import useHomeMutation from "@/src/hooks/queries/useHomeMutation";
import {useRouter} from "expo-router";
import {useEffect} from "react";
import ConfirmDelete from "@/src/components/ConfirmDelete";
export default function HomeLeave() {
  const {deleteHome} = useHomeMutation();
  const deleteHomeMutation = deleteHome()
  const router = useRouter();
  useEffect(() => {
    if(deleteHomeMutation.isSuccess) {
      router.replace("/Home");
    }
  }, [deleteHomeMutation.isSuccess]);

  function handleConfirm() {
    deleteHomeMutation.mutate();
  }

  function handleCancel() {
    router.push("/Home")
  }
  return <ConfirmDelete visible={true} name={"dom"} onConfirm={handleConfirm} onCancel={handleCancel}/>
}