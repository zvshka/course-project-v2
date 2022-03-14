import {apiRouter} from "@lib/apiRouter";
import authorization from "@services/authorization";

const apiRoute = apiRouter()

apiRoute.post(async (req, res) => {
    const body = JSON.parse(req.body)
    const data = await authorization.login(body)
    res.json(data)
})

export default apiRoute