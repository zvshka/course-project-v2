import {apiRouter} from "@lib/utils";
import BadgesService from "@services/Badges.service";
import {AuthGuard} from "@lib/AuthGuard";

const apiRoute = apiRouter()

apiRoute.get(async (req, res) => {
    const data = await BadgesService.getAll()
    return res.json(data)
})

apiRoute.post(AuthGuard({isAdmin: true}), async (req, res) => {
    const data = await BadgesService.create(req.body)
    return res.json(data)
})

export default apiRoute