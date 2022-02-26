import prisma from "@lib/prisma";

class MaterialsService {
    async create(materialDTO) {
        return await prisma.material.create({
            data: materialDTO
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

export const materialsService = new MaterialsService()