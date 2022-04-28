import prisma from "@lib/prisma";

interface CourseDTO {
    title: string,
    description: string,
    iconURL: string,
    badges: string[]
}

class CoursesService {
    async getAll(query) {
        const badges = query.badges ? query.badges.split(",").filter(b => b.length > 0) : []
        const badgesFilter = badges.length > 0 ? {
            badges: {
                some: {
                    id: {
                        in: query.badges.split(",")
                    }
                }
            }
        } : {}

        const courses = await prisma.course.findMany({
            take: 9,
            skip: Number(query.page) * 9,
            where: {
                title: {
                    contains: query.title
                },
                ...badgesFilter
            },
            include: {
                badges: true,
            }
        })
        const hasNextPage = courses.length === 9
        return {courses, hasNextPage, nextPage: hasNextPage ? Number(query.page) + 1 : null}
    }

    async create(courseDTO: CourseDTO) {
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

    async updateOneById(id: string, courseDTO: any) {
        const candidate = await this.findOneById(id)
        console.log(courseDTO)
        return await prisma.course.update({
            where: {id},
            data: {
                title: courseDTO.title,
                description: courseDTO.description,
                iconURL: courseDTO.iconURL || candidate.iconURL,
                badges: {
                    set: [...courseDTO.badges.map(badge => ({id: badge}))]
                }
            }
        })
    }
}

export default new CoursesService()