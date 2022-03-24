// import useSWR from "swr";
// import {fetcher} from "@lib/fetcher";
// import {useEffect, useState} from "react";
//
// export default function useUser() {
//     const [token, setToken] = useState(null)
//     useEffect(() =>{
//         setToken(localStorage.accessToken)
//     }, [])
//     const {
//         data,
//         error
//     } = useSWR(token ? "/api/auth/aboutMe" : null, (...args) => fetcher(...args, {
//         headers: {
//             "Authorization": `Bearer ${token}`
//         }
//     }))
//     return {
//         user: data,
//         isLoading: !error && !data,
//         isError: error
//     }
// }

import {useQuery, useQueryClient} from "react-query";

export default function useUser() {
    const queryClient = useQueryClient()
    // Queries
    const { data: user, isSuccess, isLoading, isError } = useQuery('userData', () =>
        fetch("/api/auth/aboutMe", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("accessToken")
            }
        }).then(res =>
            res.json()
        ))

    return {
        user,
        isSuccess,
        isLoading,
        isError
    }
}