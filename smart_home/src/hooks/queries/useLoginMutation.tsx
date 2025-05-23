import { useMutation } from "@tanstack/react-query";
import useFetch from "../useFetch";
import { api } from "@/src/const/api";

export default function useLoginMutation(
  setError: (error: string) => void,
  setToken: (token: string) => void
) {
  return useMutation({
    mutationFn: (data: { username: string; password: string }) =>
      fetch(api.login, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "1234",
        },
        body: JSON.stringify(data),
      }),
    onSuccess: async (response) => {
      const status = response.status;
      const data = await response.json();
      if (status === 400) {
        setError(data.Message);
        return;
      }
      setToken(data.access);
    },
  });
}
