import AuthService from "@services/AuthService";
import {apiRouter} from "@lib/utils";

const apiRoute = apiRouter()

apiRoute.post(async (req, res, next) => {
    const data = await AuthService.register(req.body)
    res.json(data)
})

export default apiRoute