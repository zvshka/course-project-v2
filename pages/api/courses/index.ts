import {apiRouter, AuthGuard} from "@lib/utils";
import CoursesService from "@services/CoursesService";

const apiRoute = apiRouter()

apiRoute.get(async (req, res) => {
    const courses = await CoursesService.getAll()
    res.status(200).json(courses)
    // res.status(500).json({error: "Ошибка типа"})
})

apiRoute.post(AuthGuard("ADMIN"), async (req, res) => {
    await CoursesService.create(req.body)
    res.status(200).json({message: "Success"})
})

export default apiRoute