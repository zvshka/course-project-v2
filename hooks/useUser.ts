import useSWR from "swr";
import {fetcher} from "@lib/fetcher";
import {useEffect, useState} from "react";

export default function useUser() {
    const [token, setToken] = useState(null)
    useEffect(() =>{
        setToken(localStorage.accessToken)
    }, [])
    const {
        data,
        error
    } = useSWR(token ? "/api/auth/aboutMe" : null, (...args) => fetcher(...args, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }))
    return {
        user: data,
        isLoading: !error && !data,
        isError: error
    }
}