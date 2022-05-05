import {apiRouter} from "@lib/utils";
import CoursesService from "@services/Courses.service";
import {AuthGuard} from "@lib/AuthGuard";

const apiRoute = apiRouter()

apiRoute.get(async (req, res) => {
    let courses;
    if (req.query.page) {
        courses = await CoursesService.getPage(req.query)
    } else {
        courses = await CoursesService.getAll()
    }
    res.status(200).json(courses)
})

apiRoute.post(AuthGuard({isAdmin: true}), async (req, res) => {
    const course = await CoursesService.create(req.body)
    res.status(200).json({message: "Курс успешно создан", courseId: course.id})
})

export default apiRoute