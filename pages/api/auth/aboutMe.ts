import {apiRouter} from "@lib/apiRouter";
import {NextApiRequest} from "next";
import {processjwt} from "@lib/authGuard";

const apiRoute = apiRouter()

apiRoute.get(processjwt, async (req: NextApiRequest & { user: any }, res, next) => {
    return res.json({user: req.user})
})

export default apiRoute