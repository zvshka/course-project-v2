import {useInfiniteQuery} from "react-query";
import axios from "axios";

const fetchCourses = ({pageParam = 0}) => {
    return axios.get("/api/courses?page=" + pageParam).then(res => res.data)
}

export default function useCourses() {
    // Queries
    // const filter = props.filter
    // const search = new URLSearchParams(filter)

    return useInfiniteQuery('courses', fetchCourses, {
        getNextPageParam: (lastPage, pages) => {
            return lastPage.nextPage
        }
    })

    // return useQuery('courses', () =>
    //     axios(`/api/courses?${search}`).then(res =>
    //         res.data
    //     )
    // )
}