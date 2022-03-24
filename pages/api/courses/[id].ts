import {apiRouter} from "@lib/apiRouter";
import {adminOnly, processjwt} from "@lib/authGuard";
import {coursesService} from "@services/courses";

const apiRoute = apiRouter()

apiRoute.get(async (req, res) => {
    const id = req.query.id
    const course = await coursesService.findOneById(id)
    res.status(200).json({...course})
})

apiRoute.patch(processjwt, adminOnly, async (req, res) => {
    const id = req.query.id
    res.status(200)
})

apiRoute.delete(processjwt, adminOnly, async (req, res) => {
    const id = req.query.id
    await coursesService.deleteOneById(id)
    res.status(200)
})

export default apiRoute