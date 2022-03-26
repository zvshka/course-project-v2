import {useQuery} from "react-query";
import axios from "axios";

export default function useUser() {
    const {data: user, isSuccess, isLoading, isError, error} = useQuery('userData', () =>
        axios("/api/auth/aboutMe", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
        }).then(res => res.data))

    return {
        user,
        isSuccess,
        isLoading,
        isError,
        error
    }
}