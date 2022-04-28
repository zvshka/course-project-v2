import {useInfiniteQuery} from "react-query";
import axios from "axios";

const fetchCourses = ({pageParam = 0}, filter = {}) => {
    console.log("/api/courses?page=" + pageParam + "&" + new URLSearchParams(filter))
    return axios.get("/api/courses?page=" + pageParam + "&" + new URLSearchParams(filter)).then(res => res.data)
}

export default function useCourses(props) {
    // Queries
    const filter = props.filter
    const search = new URLSearchParams(filter)

    return useInfiniteQuery('courses', (props) => fetchCourses(props, search), {
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