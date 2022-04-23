import prisma from "@lib/prisma";

class UsersService {
    async getAllUsers() {
        return (await prisma.user.findMany()).map(user => {
            const {password, ...userData} = user
            return userData
        })
    }

    async findOneById(id) {
        const userData = await prisma.user.findUnique({
            where: {id},
            include: {
                github: true
            }
        })
        if (userData) {
            const {password, ...user} = userData
            return user
        }
        return userData
    }
}

export default new UsersService()