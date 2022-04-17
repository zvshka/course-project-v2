import prisma from "@lib/prisma";

interface CourseDTO {
    title: string,
    description: string,
    iconURL: string,
    badges: string[]
}

class CoursesService {
    async getAll() {
        return await prisma.course.findMany({
            include: {
                badges: true,
            }
        })
    }

    async create(courseDTO: CourseDTO) {
        console.log(courseDTO)
        return await prisma.course.create({
            data: {
                title: courseDTO.title,
                description: courseDTO.description,
                iconURL: courseDTO.iconURL,
                badges: {
                    connect: [...courseDTO.badges.map(badge => ({id: badge}))]
                }
            }
        })
    }

    async findOneById(id) {
        return await prisma.course.findUnique({
            where: {
                id
            },
            include: {
                stages: {
                    include: {
                        lessons: true
                    }
                }
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