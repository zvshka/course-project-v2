import {useQuery} from "react-query";
import axios from "axios";
import useUser from "@hooks/useUser";

export default function useUsers() {
    const userData = useUser()
    const {data: users, isSuccess, isLoading, isError, error} = useQuery('usersData', () =>
        axios("/api/users", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
        }).then(res => res.data), {
        enabled: userData.isSuccess && userData.user && userData.user.role === "ADMIN"
    })

    return {
        users,
        isSuccess,
        isLoading,
        isError,
        error
    }
}