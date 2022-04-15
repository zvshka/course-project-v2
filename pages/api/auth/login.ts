import AuthService from "@services/Auth.service";
import {apiRouter} from "@lib/utils";

const apiRoute = apiRouter()

apiRoute.post(async (req, res) => {
    const data = await AuthService.login(req.body)
    res.json(data)
})

export default apiRoute