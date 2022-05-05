import {useInfiniteQuery} from "react-query";
import axios from "axios";

const fetchCourses = ({pageParam = 0}) => {
    return axios.get("/api/courses?page=" + pageParam).then(res => res.data)
}

export default function useInfiniteCourses() {
    return useInfiniteQuery('infinite_courses', fetchCourses, {
        getNextPageParam: (lastPage, pages) => {
            return lastPage.nextPage
        }
    })
}