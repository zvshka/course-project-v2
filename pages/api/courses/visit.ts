import {AuthGuard} from "@lib/AuthGuard";
import CoursesService from "@services/Courses.service";
import apiRoute from "./[id]";

apiRoute.post(AuthGuard(), async (req, res) => {
    await CoursesService.visitCourse(req.user.id, req.body.courseId)
    res.status(200).json({message: "Посещение курса успешно записано"})
})

export default apiRoute