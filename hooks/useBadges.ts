import {useQuery} from "react-query";
import axios from "axios";

export default function useBadges() {
    return useQuery('badges', () =>
        axios("/api/badges/").then(res => res.data),
    )
}