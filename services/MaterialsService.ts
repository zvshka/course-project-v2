import prisma from "@lib/prisma";

class MaterialsService {
    async create(materialDTO) {
        const last = await prisma.material.findFirst({
            where: {
                courseId: materialDTO.courseId
            },
            orderBy: {
                position: "desc"
            }
        })
        return await prisma.material.create({
            data: {
                ...materialDTO,
                position: last?.position + 1 || 1
            }
        })
    }

    async findOneById(id) {
        return await prisma.material.findUnique({
            where: {
                id
            }
        })
    }

    async updateOneById(id, materialUpdateDTO) {
        return await prisma.material.update({
            where: {
                id
            },
            data: materialUpdateDTO
        })
    }

    async deleteOneById(id) {
        return await prisma.material.delete({
            where: {id}
        })
    }
}

export default new MaterialsService()