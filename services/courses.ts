import prisma from "../lib/prisma";

class CoursesService {
    async getAll() {
        return await prisma.course.findMany({
            include: {
                author: true,
                materials: true
            }
        })
    }

    async create(courseDTO) {
        return await prisma.course.create({
            data: courseDTO
        })
    }

    async findOneById(id) {
        return await prisma.course.findUnique({
            where: {
                id
            },
            include: {
                materials: true
            }
        })
    }
}

export default new CoursesService()