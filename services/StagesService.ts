import prisma from "@lib/prisma";

class StagesService {
    async create(stageDTO) {
        const last = await prisma.stage.findFirst({
            where: {
                courseId: stageDTO.courseId
            },
            orderBy: {
                position: "desc"
            }
        })
        return await prisma.stage.create({
            data: {
                ...stageDTO,
                position: last?.position + 1 || 1
            }
        })

    }

    async findOneById(id) {
        return await prisma.stage.findUnique({
            where: {id},
            include: {
                lessons: true
            }
        })
    }
}

export default new StagesService()