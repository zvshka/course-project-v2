import prisma from "@lib/prisma";
import bcrypt from "bcrypt";
import {signToken, transporter} from "@lib/utils";
import nodemailer from "nodemailer";
import UsersService from "@services/Users.service";
import cuid from "cuid";


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
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        const config = {
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        };

        const emailSender = transporter(config)

        let info = await emailSender.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: email, // list of receivers
            subject: "Восстановление пароля", // Subject line
            html: `<h3>Восстановление пароля</h3><p>Если вы не запрашивали восстановления пароля - игнорируйте письмо</p><a href='${process.env.BASE_URL}/auth/reset?code=${password_reset_code}'>Сссылка для восстановления</a>`,
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

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

        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        const config = {
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        };

        const emailSender = transporter(config)

        let info = await emailSender.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: candidate.email, // list of receivers
            subject: "Подтверждение Email", // Subject line
            html: `<h3>Подтверждение Email</h3><p>Если вы не запрашивали - игнорируйте письмо</p><a href='${process.env.BASE_URL}/api/auth/confirm?code=${email_verification_code}'>Сссылка для подтверждения</a>`,
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

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