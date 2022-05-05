import {useQuery} from "react-query";
import axios from "axios";

export default function useUserCourses() {
    return useQuery('user_courses', () =>
        axios.get("/api/auth/aboutMe/active_courses").then(res => res.data), {retry: failureCount => failureCount < 0})
}