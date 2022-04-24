import {apiRouter} from "@lib/utils";
import LessonsService from "@services/Lessons.service";
import {AuthGuard} from "@lib/AuthGuard";

const apiRoute = apiRouter()

apiRoute.post(AuthGuard({isAdmin: true}), async (req, res) => {
    await LessonsService.create(req.body)
    res.status(200).json({message: "Урок успешно создан"})
})

export default apiRoute