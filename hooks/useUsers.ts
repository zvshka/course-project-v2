import {useQuery} from "react-query";
import axios from "axios";
import useUser from "@hooks/useUser";

export default function useUsers() {
    const user = useUser()
    return useQuery('users', () =>
        axios("/api/users", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
        }).then(res => res.data), {
        enabled: user.isSuccess && user.data.role && user.data.role === "ADMIN"
    })
}