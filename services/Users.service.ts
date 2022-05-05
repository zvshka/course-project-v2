import prisma from "@lib/prisma";
import cuid from "cuid"
import UserUpdateDto from "@services/DTO/UserUpdate.dto";

class UsersService {
    async getAllUsers() {
        return (await prisma.user.findMany()).map(user => {
            const {password, ...userData} = user
            return userData
        })
    }

    async getUserActiveCourses(id: string) {
        return await prisma.course.findMany({
            where: {
                visited_users: {
                    some: {
                        userId: id
                    }
                }
            },
            include: {
                badges: true
            }
        })
    }

    async findOneById(id:string) {
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
                },
            }
        })
        if (userData) {
            const {password, email_verification_code, password_reset_code, ...user} = userData
            return user
        }
        return userData
    }

    async findOneByEmail(email: string) {
        return await prisma.user.findUnique({
            where: {email}
        })
    }

    async updateOneById(id: string, updateDTO: UserUpdateDto) {
        return await prisma.user.update({
            where: {id},
            data: {
                firstname: updateDTO.firstname,
                lastname: updateDTO.lastname,
                avatarURL: updateDTO.avatarURL
            }
        })
    }

    async findOneByEmailCode(code) {
        return await prisma.user.findUnique({
            where: {email_verification_code: code}
        })
    }

    async findOneByPasswordCode(code: any) {
        return await prisma.user.findUnique({
            where: {password_reset_code: code}
        })
    }
}

export default new UsersService()