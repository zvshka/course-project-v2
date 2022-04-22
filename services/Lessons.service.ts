import prisma from "@lib/prisma";

class LessonsService {
    async create(lessonDTO) {
        const last = await prisma.lesson.findFirst({
            where: {
                stageId: lessonDTO.stageId
            },
            orderBy: {
                position: "desc"
            }
        })

        return await prisma.lesson.create({
            data: {
                ...lessonDTO,
                position: last?.position + 1 || 1
            }
        })
    }

    async findOneById(id) {
        return await prisma.lesson.findUnique({
            where: {id},
            include: {
                stage: {
                    include: {
                        course: true
                    }
                }
            }
        })
    }

    async deleteOneById(id) {
        return await prisma.lesson.delete({
            where: {id}
        })
    }

    async updateOneById(id: string, body: any) {
        return await prisma.lesson.update({
            where: {id},
            data: body
        })
    }
}

export default new LessonsService()