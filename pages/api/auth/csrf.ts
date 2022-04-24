import {apiRouter} from "@lib/utils";
import csrf from "csurf"
import {NextApiRequest} from "next";

const apiRoute = apiRouter()

apiRoute.get(async (req: NextApiRequest & {csrfToken: any}, res) => {
    res.json({ csrfToken: req.csrfToken() });
})

export default apiRoute