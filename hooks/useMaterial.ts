// import useSWR from "swr";
// import {fetcher} from "@lib/fetcher";
//
// export default function useMaterial(id) {
//     const {data, error} = useSWR(id ? "/api/materials/" + id : null, fetcher)
//     return {
//         material: data,
//         isLoading: !error && !data,
//         isError: error
//     }
// }

import {useQuery, useQueryClient} from "react-query";

export default function useMaterial(id) {
    const queryClient = useQueryClient()
    // Queries
    const {data, isSuccess, isLoading, isError} = useQuery(['materialData', id], () =>
        fetch("/api/materials/" + id).then(res =>
            res.json()
        ), {enabled: !!id})
    return {
        material: data,
        isSuccess,
        isLoading,
        isError
    }
}