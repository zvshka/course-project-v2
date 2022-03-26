import {useQuery, useQueryClient} from "react-query";
import axios from "axios";
import {useNotifications} from "@mantine/notifications";

export default function useCourses() {
    // Queries
    const { data, isSuccess, isLoading, isError, error } = useQuery('coursesData', () =>
        axios("/api/courses/").then(res =>
            res.data
        )
    )

    return {
        courses: data,
        isSuccess,
        isLoading,
        isError,
        error
    }
}