import {useInfiniteQuery, useQuery} from "react-query";
import axios from "axios";

const fetchCourses = ({pageParam = 0}) => {
    return axios.get("/api/courses?cursor=" + pageParam).then(res => res.data)
}

export default function useCourses(props) {
    // Queries
    const filter = props.filter
    const search = new URLSearchParams(filter)

    const infQuery = useInfiniteQuery('courses', fetchCourses, {
        getNextPageParam: (lastPage, pages) => lastPage.nextCursor
    })

    return infQuery

    // return useQuery('courses', () =>
    //     axios(`/api/courses?${search}`).then(res =>
    //         res.data
    //     )
    // )
}