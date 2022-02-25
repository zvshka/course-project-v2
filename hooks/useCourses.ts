import useSWR from "swr";
import {fetcher} from "@lib/fetcher";

export default function useCourses() {
    const {data, error} = useSWR("/api/courses/", fetcher)
    return {
        courses: data,
        isLoading: !error && !data,
        isError: error
    }
}