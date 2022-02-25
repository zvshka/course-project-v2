import useSWR from "swr";
import {fetcher} from "@lib/fetcher";

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

export default function useCourse(id): IUseCourseResponse {
    const {data, error} = useSWR(id ? "/api/courses/" + id : null, fetcher)
    return {
        course: data,
        isLoading: !error && !data,
        isError: error
    }
}