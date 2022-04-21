import LessonsService from "@services/Lessons.service";
import {apiRouter} from "@lib/utils";
import {AuthGuard} from "@lib/AuthGuard";

const apiRoute = apiRouter()

apiRoute.get(async (req, res) => {
    const data = await LessonsService.findOneById(req.query.id)
    return res.status(200).json(data)
})

apiRoute.delete(AuthGuard("ADMIN"), async (req, res) => {
    await LessonsService.deleteOneById(req.query.id)
    res.status(200).json({message: "Урок успешно удален"})
})

export default apiRoute