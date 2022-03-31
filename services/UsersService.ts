import prisma from "@lib/prisma";

class UsersService {
    async getAllUsers() {
        return (await prisma.user.findMany()).map(user => {
            const {password, ...userData} = user
            return userData
        })
    }

    async findOneById(id) {
        const {password, ...userData} = await prisma.user.findUnique({
            where: {id}
        })
        return userData
    }
}

export default new UsersService()