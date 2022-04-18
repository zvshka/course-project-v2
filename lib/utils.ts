import jwt from "jsonwebtoken";
import nextConnect from "next-connect";
import {NextApiRequest, NextApiResponse} from "next";

export const apiRouter = () => nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
        console.error(error)
        res.status(500).json({error: `Sorry something Happened! ${error.message}`});
    },
    onNoMatch(req, res) {
        res.status(405).json({error: `Method '${req.method}' Not Allowed`});
    },
})

export const mapToIds = (arr) => {
    return arr.map(el => el.id)
}

interface IData {
    id: string
    role: string
}

export const signToken = (data: IData) => {
    return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d"
    })
}

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as IData
    } catch (e) {
        return null
    }
}