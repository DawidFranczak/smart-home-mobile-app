import { api } from "@/src/const/api";
import { useAuth } from "@/src/context/AuthContext";
import useFetch from "@/src/hooks/useFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Logout() {
  const { deleteData } = useFetch();
  const { logout } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => deleteData(api.logout),
    onSuccess: () => {
      logout();
      router.push("/Login");
      const allQueries = queryClient.getQueryCache().getAll();
      allQueries.forEach((query) => {
        if (query.queryKey[0] !== "token") {
          queryClient.removeQueries({ queryKey: query.queryKey });
        }
      });
    },
  });
  useEffect(() => {
    mutation.mutate();
  });
  return null;
}
