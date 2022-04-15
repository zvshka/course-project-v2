import {apiRouter, AuthGuard} from "@lib/utils";
import BadgesService from "@services/Badges.service";

const apiRoute = apiRouter()

apiRoute.get(async (req, res) => {
    const data = await BadgesService.getAll()
    return res.json(data)
})

apiRoute.post(AuthGuard("ADMIN"), async (req, res) => {
    const data = await BadgesService.create(req.body)
    return res.json(data)
})

export default apiRoute