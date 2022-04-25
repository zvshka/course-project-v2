import {NextFetchEvent, NextRequest, NextResponse} from "next/server";
import jwt from "jsonwebtoken";

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) as { id: string, role: string }
    } catch (e) {
        return null
    }
}

export default async function AuthMiddleware(req: NextRequest, ev: NextFetchEvent) {
    const access_token = req.cookies.access_token
    const tokenData = verifyToken(access_token)
    if (tokenData?.id) return NextResponse.redirect(new URL('/', req.url))
    return NextResponse.next()
    // const tokenData = verifyToken(access_token)
    // console.log(tokenData)
    // if (!tokenData) return response
    // else return NextResponse.rewrite(req.url)
    // const userData = await UsersService.findOneById(tokenData.id)
    // if (userData) return NextResponse.rewrite(req.url)
    // return NextResponse.next()
}