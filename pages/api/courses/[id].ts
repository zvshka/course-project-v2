import CoursesService from "@services/CoursesService";
import {apiRouter, AuthGuard} from "@lib/utils";

const apiRoute = apiRouter()

apiRoute.get(async (req, res) => {
    const id = req.query.id
    if (!req.query.id) return res.status(400).json({error: "No id provided"})
    const course = await CoursesService.findOneById(id)
    res.status(200).json(course)
})

apiRoute.patch(AuthGuard("ADMIN"), async (req, res) => {
    const id = req.query.id
    if (!req.query.id) return res.status(400).json({error: "No id provided"})
    res.status(200)
})

apiRoute.delete(AuthGuard("ADMIN"), async (req, res) => {
    const id = req.query.id
    if (!req.query.id) return res.status(400).json({error: "No id provided"})
    await CoursesService.deleteOneById(id)
    res.status(200)
})

export default apiRoute