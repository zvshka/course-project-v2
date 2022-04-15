import {apiRouter, AuthGuard} from "@lib/utils";
import CoursesService from "@services/Courses.service";

const apiRoute = apiRouter()

apiRoute.get(async (req, res) => {
    const courses = await CoursesService.getAll()
    res.status(200).json(courses)
    // res.status(500).json({error: "Ошибка типа"})
})

apiRoute.post(AuthGuard("ADMIN"), async (req, res) => {
    const course = await CoursesService.create(req.body)
    res.status(200).json({message: "Success", course})
})

export default apiRoute