import { prismaMock } from './singleton'
import cuid from "cuid";
import CoursesService from "../services/Courses.service";
test('Должно создать новый курс', async () => {
    const id = cuid()
    const course = {
        id,
        title: "Test Course",
        description: "Testing description",
        iconURL: "",
        badges: []
    }

    prismaMock.course.create.mockResolvedValue(course)

    await expect(CoursesService.create(course)).resolves.toEqual(course)
})

test("Должно обновить курс", async () => {
    const id = cuid()
    const course = {
        id,
        title: "Test Course",
        description: "Testing description",
        iconURL: "",
        badges: []
    }

    prismaMock.course.update.mockResolvedValue(course)

    await expect(CoursesService.updateOneById(id, course)).resolves.toEqual(course)
})