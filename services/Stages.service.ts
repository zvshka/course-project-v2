import prisma from "@lib/prisma";
import StageDto from "@services/DTO/Stage.dto";
import StageUpdateDto from "@services/DTO/StageUpdate.dto";

class StagesService {
    async create(stageDTO: StageDto) {
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
                courseId: stageDTO.courseId,
                title: stageDTO.title,
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

    async updateOneById(id: string, stageDTO: StageUpdateDto) {
        return await prisma.stage.update({
            where: {id},
            data: {
                title: stageDTO.title,
                position: stageDTO.position
            }
        })
    }

    async deleteOneById(id: string) {
        return await prisma.stage.delete({
            where: {id}
        })
    }

    async findOneById(id: string) {
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