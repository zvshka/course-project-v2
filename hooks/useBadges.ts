import {QueriesResults, useQuery, UseQueryResult} from "react-query";
import axios from "axios";
import {Badge} from "types/Badge";

export default function useBadges() {
    return useQuery<Badge[], Error>('badges', () =>
        axios("/api/badges/").then(res => res.data),
    )
}