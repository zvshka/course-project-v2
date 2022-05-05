import {useQuery} from "react-query";
import axios from "axios";
import {User} from "types/User";

export default function useUser() {
    return useQuery<User, Error>('user', () =>
        axios.get("/api/auth/aboutMe").then(res => res.data), {retry: failureCount => failureCount < 0})
}