import prisma from "@lib/prisma";
import bcrypt from "bcrypt";
import {signToken, transporter} from "@lib/utils";
import UsersService from "@services/Users.service";
import cuid from "cuid";
import RegisterDto from "@services/DTO/Register.dto";
import LoginDto from "@services/DTO/Login.dto";

const config = {
    host: "smtp.localhost",
    port: 1025,
    secure: false,
    auth: {
        user: "user",
        pass: "pass"
    }
}

const emailSender = transporter(config)

class AuthService {

    async register(registerDTO: RegisterDto) {
        const {email, username, password} = registerDTO
        const candidate = await prisma.user.findMany({
            where: {
                OR: [{username}, {email}]
            }
        })
        if (candidate.length > 0) throw new Error("Email или имя пользователя уже используются")
        const hashPassword = await bcrypt.hash(password, 10)
        const github = registerDTO.github ? {
            connect: {
                id: registerDTO.github
            }
        } : {}
        const user = await prisma.user.create({
            data: {
                email, username,
                password: hashPassword,
                github
            }
        })
        const accessToken = signToken({id: user.id, role: user.role})

        await emailSender.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: email, // list of receivers
            subject: "Успешная регистрация", // Subject line
            html: `<h3>Спасибо за регистрацию</h3><p>Теперь вы зарегистрированы на сайте Fantastic Waffle</p>`,
        });

        return {accessToken}
    }

    async login(loginDTO: LoginDto) {
        const {email, password} = loginDTO
        const candidate = await prisma.user.findUnique({
            where: {email}
        })
        if (!candidate) throw new Error("Неверный Email и/или пароль")
        const passwordEquals = await bcrypt.compare(password, candidate.password)
        if (!passwordEquals) throw new Error("Неверный Email и/или пароль")
        const accessToken = signToken({id: candidate.id, role: candidate.role})
        return {accessToken}
    }

    async resetPassword({code, password}: {code: string, password: string}) {
        const candidate = await UsersService.findOneByPasswordCode(code)
        if (!candidate) throw new Error("Не верный код")
        const hashPassword = await bcrypt.hash(password, 10)
        await prisma.user.update({
            where: {id: candidate.id},
            data: {
                password: hashPassword,
                password_reset_code: null
            }
        })
        return
    }

    async forgotPassword(email: string) {

        const candidate = await UsersService.findOneByEmail(email)
        if (!candidate) return true
        const {password_reset_code} = await prisma.user.update({
            where: {id: candidate.id},
            data: {
                password_reset_code: cuid()
            }
        })

        await emailSender.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: email, // list of receivers
            subject: "Восстановление пароля", // Subject line
            html: `<h3>Восстановление пароля</h3><p>Если вы не запрашивали восстановления пароля - игнорируйте письмо</p><a href='${process.env.BASE_URL}/auth/reset?code=${password_reset_code}'>Сссылка для восстановления</a>`,
        });

        return true
    }

    async sendVerification(id: string) {
        const candidate = await UsersService.findOneById(id)
        if (!candidate) return false
        const {email_verification_code} = await prisma.user.update({
            where: {id},
            data: {
                email_verification_code: cuid()
            }
        })

        await emailSender.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: candidate.email, // list of receivers
            subject: "Подтверждение Email", // Subject line
            html: `<h3>Подтверждение Email</h3><p>Если вы не запрашивали - игнорируйте письмо</p><a href='${process.env.BASE_URL}/api/auth/confirm?code=${email_verification_code}'>Сссылка для подтверждения</a>`,
        });

        return true

    }

    async confirmEmail(code: string) {
        const candidate = await UsersService.findOneByEmailCode(code)
        if (!candidate) return false
        await prisma.user.update({
            where: {
                id: candidate.id
            },
            data: {
                email_verified: new Date
            }
        })
        return true
    }
}

export default new AuthService()