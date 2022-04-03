import prisma from "@lib/prisma";

class CoursesService {
    async getAll() {
        return await prisma.course.findMany({})
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
                stages: true
            }
        })
    }

    async deleteOneById(id) {
        return await prisma.course.delete({
            where: {
                id
            }
        })
    }

    async deleteById(id) {
        return await prisma.course.delete({
            where: {
                id
            }
        })
    }
}

export default new CoursesService()