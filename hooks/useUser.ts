import {useQuery} from "react-query";
import axios from "axios";

export default function useUser() {
    return useQuery('user', () =>
        axios("/api/auth/aboutMe", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
        }).then(res => res.data))
}