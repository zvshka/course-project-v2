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
                github: {
                    select: {
                        id: true,
                        accountId: true,
                        email: true,
                        login: true,
                        avatar_url: true,
                        name: true
                    }
                }
            }
        })
        if (userData) {
            const {password, ...user} = userData
            return user
        }
        return userData
    }

    async updateOneById(id: string, updateDTO: any) {
        return await prisma.user.update({
            where: {id},
            data: {
                firstname: updateDTO.firstname,
                lastname: updateDTO.lastname,
                avatarURL: updateDTO.avatarURL
            }
        })
    }
}

export default new UsersService()