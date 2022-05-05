import prisma from "@lib/prisma";
import LessonDto from "@services/DTO/Lesson.dto";
import LessonUpdateDto from "@services/DTO/LessonUpdate.dto";

class LessonsService {
    async create(lessonDTO: LessonDto) {
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
                text: lessonDTO.text,
                title: lessonDTO.title,
                description: lessonDTO.description,
                stageId: lessonDTO.stageId,
                position: last?.position + 1 || 1
            }
        })
    }

    async findOneById(id: string) {
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

    async deleteOneById(id: string) {
        return await prisma.lesson.delete({
            where: {id}
        })
    }

    async updateOneById(id: string, lessonUpdateDTO: LessonUpdateDto) {
        return await prisma.lesson.update({
            where: {id},
            data: lessonUpdateDTO
        })
    }
}

export default new LessonsService()