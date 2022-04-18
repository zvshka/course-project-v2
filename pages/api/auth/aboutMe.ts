import {apiRouter} from "@lib/utils";
import {AuthGuard} from "@lib/AuthGuard";
import {NextApiRequest} from "next";

const apiRoute = apiRouter()

apiRoute.get(AuthGuard(), async (req: NextApiRequest & { user: any }, res, next) => {
    return res.json(req.user)
})

export default apiRoute