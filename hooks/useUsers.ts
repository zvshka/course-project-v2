import {useQuery} from "react-query";
import useUser from "@hooks/useUser";
import {fetcher} from "@lib/utils";

export default function useUsers() {
    const user = useUser()
    return useQuery('users', () =>
        fetcher("/api/users", {
            method: "GET",
            auth: true
        }).then(res => res.data), {
        enabled: user.isSuccess && user.data.role && user.data.role === "ADMIN"
    })
}