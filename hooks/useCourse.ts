import {useQuery, useQueryClient} from "react-query";

interface ICourseData {
    title: string
    description: string
    materials: any[]
}

interface IUseCourseResponse {
    course: ICourseData,
    isLoading: boolean
    isError: boolean
}

export default function useCourse(id) {
    const queryClient = useQueryClient()
    const {data, isSuccess, isLoading, isError} = useQuery(['courseData', id], () =>
            fetch("/api/courses/" + id).then(res => res.json()),
        {enabled: !!id}
    )

    return {
        course: data,
        isSuccess,
        isLoading,
        isError
    }
}