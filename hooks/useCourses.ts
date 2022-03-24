import useSWR from "swr";
import {fetcher} from "@lib/fetcher";
import {useQuery, useQueryClient} from "react-query";

export default function useCourses() {
    const queryClient = useQueryClient()
    // Queries
    const { data, isSuccess, isLoading, isError } = useQuery('coursesData', () =>
        fetch("/api/courses/").then(res =>
            res.json()
        )
    )

    return {
        courses: data,
        isSuccess,
        isLoading,
        isError
    }
}