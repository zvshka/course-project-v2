import useSWR from "swr";
import {fetcher} from "@lib/fetcher";

export default function useMaterial(id) {
    const {data, error} = useSWR(id ? "/api/materials/" + id : null, fetcher)
    return {
        material: data,
        isLoading: !error && !data,
        isError: error
    }
}