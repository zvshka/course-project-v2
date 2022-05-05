import jwt from "jsonwebtoken";
import nextConnect from "next-connect";
import {NextApiRequest, NextApiResponse} from "next";
import cookieParse from "cookie-parser"
import {CookieSerializeOptions, serialize} from 'cookie'
import csrf from "csurf";
import nodemailer from "nodemailer"

const csrfProtection = csrf({
    cookie: true
});

export const transporter = (config) => nodemailer.createTransport(config);

export const apiRouter = () => nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
        console.error(error)
        if (error.code === "EBADCSRFTOKEN") return res.status(403).json({error: error.message});
        res.status(500).json({error: `Sorry something Happened! ${error.message}`});
    },
    onNoMatch(req, res) {
        res.status(405).json({error: `Method '${req.method}' Not Allowed`});
    },
}).use(csrfProtection).use(cookieParse())

export const setCookie = (
    res: NextApiResponse,
    name: string,
    value: unknown,
    options: CookieSerializeOptions = {}
) => {
    const stringValue =
        typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

    if ('maxAge' in options) {
        options.expires = new Date(Date.now() + options.maxAge)
        options.maxAge /= 1000
    }

    res.setHeader('Set-Cookie', serialize(name, stringValue, {path: "/", ...options}))
}

export const signToken = (data: { id: string, role: string }) => {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d"
    })
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as { id: string, role: string }
    } catch (e) {
        return null
    }
}