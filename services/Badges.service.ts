import prisma from "@lib/prisma";

class BadgesService {
    async create(badgeDTO) {
        return await prisma.badge.create({
            data: badgeDTO
        })
    }

    async getAll() {
        return await prisma.badge.findMany({})
    }
}

export default new BadgesService()