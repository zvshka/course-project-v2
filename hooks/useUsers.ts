import {useQuery} from "react-query";
import useUser from "@hooks/useUser";
import axios from "axios";
import { User } from "types/User";

export default function useUsers() {
    const user = useUser()
    return useQuery<User[], Error>('users', () =>
        axios("/api/users").then(res => res.data), {
        enabled: user.isSuccess && user.data.role && user.data.role === "ADMIN"
    })
}