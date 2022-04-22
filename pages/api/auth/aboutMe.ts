import {apiRouter} from "@lib/utils";
import {AuthGuard} from "@lib/AuthGuard";
import {NextApiRequest} from "next";

const apiRoute = apiRouter()

apiRoute.get(AuthGuard(), async (req: NextApiRequest & { user: any }, res, next) => {
    console.log(req.user)
    return res.status(200).json(req.user)
})

export default apiRoute