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
                badges: true
            }
        })
    }

    async getPage(query) {
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
            skip: (isNaN(Number(query.page)) ? 1 : Number(query.page)) * 9,
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

    async visitCourse(userId: any, courseId: any) {
        console.log(userId, courseId)
        return await prisma.course.update({
            where: {id: courseId},
            data: {
                visited_users: {
                    connectOrCreate: {
                        where: {
                            userId_courseId: {
                                userId,
                                courseId
                            }
                        },
                        create: {
                            userId,
                            visit_date: new Date
                        }
                    }
                }
            }
        })
    }
}

export default new CoursesService()