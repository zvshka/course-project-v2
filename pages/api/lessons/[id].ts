import LessonsService from "@services/LessonsService";
import {apiRouter} from "@lib/utils";

const apiRoute = apiRouter()

apiRoute.get(async (req, res) => {
    const data = await LessonsService.findOneById(req.query.id)
    return res.status(200).json(data)
})

export default apiRoute