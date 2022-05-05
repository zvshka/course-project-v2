import {useInfiniteQuery} from "react-query";
import axios from "axios";

const fetchCourses = ({pageParam = 0}) => {
    console.log(pageParam)
    return axios.get("/api/courses?page=" + pageParam).then(res => res.data)
}

export default function useInfiniteCourses() {
    // Queries
    // const filter = props.filter
    // const search = new URLSearchParams(filter)

    return useInfiniteQuery('infinite_courses', fetchCourses, {
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