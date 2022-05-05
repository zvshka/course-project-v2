import {useQuery} from "react-query";
import axios from "axios";

export default function useCourses() {
    // Queries
    // const filter = props.filter
    // const search = new URLSearchParams(filter)

    // return useInfiniteQuery('courses', fetchCourses, {
    //     getNextPageParam: (lastPage, pages) => {
    //         return lastPage.nextPage
    //     }
    // })

    return useQuery('courses', () =>
        axios(`/api/courses`).then(res =>
            res.data
        )
    )
}