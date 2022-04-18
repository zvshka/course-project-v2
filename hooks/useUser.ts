import {useQuery} from "react-query";
import {fetcher} from "@lib/utils";

export default function useUser() {
    return useQuery('user', () =>
        fetcher("/api/auth/aboutMe", {
            method: "GET",
            auth: true,
        }).then(res => res.data))
}