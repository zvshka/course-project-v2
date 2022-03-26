import prisma from "@lib/prisma";

class UsersService {
    async getAllUsers() {
        return (await prisma.user.findMany()).map(user => {
            const {password: _, ...userData} = user
            return userData
        })
    }

    async findOneById(id) {
        const {password, ...candidate} = await prisma.user.findUnique({
            where: {id},
            include: {
                doneMaterials: true
            }
        })
        return candidate
    }
}

export default new UsersService()