import LessonsService from "@services/Lessons.service";
import {apiRouter} from "@lib/utils";
import {AuthGuard} from "@lib/AuthGuard";

const apiRoute = apiRouter()

apiRoute.get(async (req, res) => {
    const data = await LessonsService.findOneById(req.query.id)
    return res.status(200).json(data)
})

apiRoute.patch(AuthGuard({isAdmin: true}), async (req, res) => {
    await LessonsService.updateOneById(req.query.id as string, req.body)
    res.status(200).json({message: "Урок успешно обновлен"})
})

apiRoute.delete(AuthGuard({isAdmin: true}), async (req, res) => {
    await LessonsService.deleteOneById(req.query.id)
    res.status(200).json({message: "Урок успешно удален"})
})

export default apiRoute