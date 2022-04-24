import {useQuery} from "react-query";
import axios from "axios";

export default function useUser() {
    return useQuery('user', () =>
        axios.get("/api/auth/aboutMe").then(res => res.data), {retry: failureCount => failureCount < 0})
}