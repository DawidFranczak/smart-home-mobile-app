import { useMutation } from "@tanstack/react-query";
import { api } from "@/src/const/api";
import { saveSecureValue } from "@/src/utils/storage";
export default function useLoginMutation(
    setError: (error: string) => void,
    setAccess: (token: string) => void
) {
    return useMutation({
        mutationFn: (data: { username: string; password: string }) =>
            fetch(api.login, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "1234",
                    "X-Client-Type": "mobile",
                },
                body: JSON.stringify(data),
            }),
        onSuccess: async (response) => {
            const status = response.status;
            const data = await response.json();
            if (status === 400) {
                setError(data.message);
                return;
            }
            setAccess(data.access);
            await saveSecureValue("access", data.access);
            await saveSecureValue("refresh", data.refresh);
        },
    });
}