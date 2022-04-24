import CoursesService from "@services/Courses.service";
import {apiRouter} from "@lib/utils";
import {AuthGuard} from "@lib/AuthGuard";

const apiRoute = apiRouter()

apiRoute.get(async (req, res) => {
    const id = req.query.id
    if (!req.query.id) return res.status(400).json({error: "Не найден id"})
    const course = await CoursesService.findOneById(id)
    res.status(200).json(course)
})

apiRoute.patch(AuthGuard({isAdmin: true}), async (req, res) => {
    const id = req.query.id
    if (!req.query.id) return res.status(400).json({error: "Не найден id"})
    res.status(200)
})

apiRoute.delete(AuthGuard({isAdmin: true}), async (req, res) => {
    const id = req.query.id
    if (!req.query.id) return res.status(400).json({error: "Не найден id"})
    await CoursesService.deleteOneById(id)
    res.status(200).json({message: "Курс успешно удален"})
})

export default apiRoute