import prisma from "@lib/prisma";
import CourseDto from "@services/DTO/Course.dto";
import CourseUpdateDto from "@services/DTO/CourseUpdate.dto";
import UsersService from "@services/Users.service";

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

    async create(courseDTO: CourseDto) {
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

    async findOneById(id: string) {
        return await prisma.course.findUnique({
            where: {id},
            include: {
                stages: {
                    include: {
                        lessons: true
                    }
                }
            }
        })
    }

    async deleteOneById(id: string) {
        const candidate = await this.findOneById(id)
        if (!candidate) throw new Error("Не найден курс с таким id")
        return await prisma.course.delete({
            where: {
                id
            }
        })
    }

    async updateOneById(id: string, courseDTO: CourseUpdateDto) {
        const candidate = await this.findOneById(id)
        if (!candidate) throw new Error("Курс с таким id не найден")
        return await prisma.course.update({
            where: {id},
            data: {
                title: courseDTO.title,
                description: courseDTO.description,
                iconURL: courseDTO.iconURL,
                badges: {
                    set: [...courseDTO.badges.map(badge => ({id: badge}))]
                }
            }
        })
    }

    async visitCourse(userId: string, courseId: string) {
        const userCandidate = await UsersService.findOneById(userId)
        const courseCandidate = await this.findOneById(courseId)
        if (!userCandidate || !courseCandidate) throw new Error("Не найден курс или пользователь")
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