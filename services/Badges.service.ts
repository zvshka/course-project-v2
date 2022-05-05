import prisma from "@lib/prisma";
import BadgeDto from "@services/DTO/Badge.dto";

class BadgesService {
    async create(badgeDTO: BadgeDto) {
        return await prisma.badge.create({
            data: badgeDTO
        })
    }

    async getAll() {
        return await prisma.badge.findMany({})
    }
}

export default new BadgesService()