import prisma from "@lib/prisma";
import cuid from "cuid"

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

    async findOneByEmail(email) {
        return await prisma.user.findUnique({
            where: {email}
        })
    }

    async createPasswordResetCode(id) {
        return await prisma.user.update({
            where: {id},
            data: {
                password_reset_code: cuid()
            }
        })
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

    async findOneByPasswordCode(code: any) {
        return await prisma.user.findUnique({
            where: {password_reset_code: code}
        })
    }
}

export default new UsersService()