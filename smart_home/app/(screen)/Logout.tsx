import { api } from "@/src/const/api";
import { useAuth } from "@/src/context/AuthContext";
import useFetch from "@/src/hooks/useFetch";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Logout() {
  const { deleteData } = useFetch();
  const { logout } = useAuth();
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: () => deleteData(api.logout),
    onSuccess: () => {
      logout();
      router.push("/Login");
    },
  });
  useEffect(() => {
    mutation.mutate();
  });
  return null;
}
