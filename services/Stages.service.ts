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

    async updateMany(arr: {id: string, position: number}[]) {
        for (let data of arr) {
            await prisma.stage.update({
                where: {id: data.id},
                data: {
                    position: data.position
                }
            })
        }
    }

    async updateOne(id, stageDTO) {
        return await prisma.stage.update({
            where: {id},
            data: {
                title: stageDTO.title
            }
        })
    }

    async deleteOneById(id) {
        return await prisma.stage.delete({
            where: {id}
        })
    }

    async findOneById(id) {
        return await prisma.stage.findUnique({
            where: {id},
            include: {
                lessons: {
                    include: {
                        stage: {
                            select: {
                                courseId: true
                            }
                        }
                    }
                }
            }
        })
    }
}

export default new StagesService()