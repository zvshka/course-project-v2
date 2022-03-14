import {coursesService} from "@services/courses";
import {adminOnly, processjwt} from "@lib/authGuard";

import {apiRouter} from "@lib/apiRouter";

const apiRoute = apiRouter()

apiRoute.get(async (req, res) => {
    const courses = await coursesService.getAll()
    res.status(200).json(courses)
})

apiRoute.post(processjwt, adminOnly, async (req, res) => {
    await coursesService.create(JSON.parse(req.body)).catch(e => {
        res.status(400).json({error: e})
    })
})

export default apiRoute