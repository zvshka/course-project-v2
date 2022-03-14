import jwt from "jsonwebtoken";
import {JWTPayload} from "jose";

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
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as IData
}