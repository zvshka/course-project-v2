import {apiRouter} from "@lib/utils";
import {AuthGuard} from "@lib/AuthGuard";
import UsersService from "@services/Users.service";

const apiRoute = apiRouter()

apiRoute.post(AuthGuard(), async (req, res) => {
    await UsersService.visitCourse(req.user.id, req.body.courseId)
    res.status(200).json({message: "Посещение курса успешно записано"})
})

export default apiRoute