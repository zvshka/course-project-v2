import {useQuery} from "react-query";
import axios from "axios";

export default function useMaterial(id) {
    // Queries
    const {data, isSuccess, isLoading, isError, error} = useQuery(['materialData', id], () =>
        axios("/api/materials/" + id).then(res =>
            res.data
        ), {enabled: !!id})

    return {
        material: data,
        isSuccess,
        isLoading,
        isError,
        error
    }
}