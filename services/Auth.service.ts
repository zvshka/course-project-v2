import prisma from "@lib/prisma";
import bcrypt from "bcrypt";
import {signToken, transporter} from "@lib/utils";
import UsersService from "@services/Users.service";
import cuid from "cuid";

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

    async register(registerDTO) {
        const {email, username, password} = registerDTO
        const candidate = await prisma.user.findMany({
            where: {
                OR: [{username}, {email}]
            }
        })
        if (candidate.length > 0) throw new Error("Email or username already in use")
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

    async login(loginDTO) {
        const {email, password} = loginDTO
        const candidate = await prisma.user.findUnique({
            where: {email}
        })
        if (!candidate) throw new Error("No user with that email")
        const passwordEquals = await bcrypt.compare(password, candidate.password)
        if (!passwordEquals) throw new Error("Passwords did not match")
        const accessToken = signToken({id: candidate.id, role: candidate.role})
        return {accessToken}
    }

    async resetPassword({code, password}) {
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

    async forgotPassword(email) {

        const candidate = await UsersService.findOneByEmail(email)
        if (!candidate) return true
        const {password_reset_code} = await UsersService.createPasswordResetCode(candidate.id)

        await emailSender.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: email, // list of receivers
            subject: "Восстановление пароля", // Subject line
            html: `<h3>Восстановление пароля</h3><p>Если вы не запрашивали восстановления пароля - игнорируйте письмо</p><a href='${process.env.BASE_URL}/auth/reset?code=${password_reset_code}'>Сссылка для восстановления</a>`,
        });

        return true
    }

    async sendVerification(id) {
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

    async confirmEmail(code) {
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