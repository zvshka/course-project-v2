import {useQuery} from "react-query";
import axios from "axios";

export default function useCourse(id) {
    const {data, isSuccess, isLoading, isError, error} = useQuery(['courseData', id], () =>
            axios("/api/courses/" + id).then(res => res.data),
        {enabled: !!id}
    )

    return {
        course: data,
        isSuccess,
        isLoading,
        isError,
        error
    }
}