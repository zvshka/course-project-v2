import {NextFetchEvent, NextRequest, NextResponse} from "next/server";

export default async function AuthMiddleware(req: NextRequest, ev: NextFetchEvent) {
    if (req.url.includes("reset")) return NextResponse.next()
    const data = await fetch(process.env.BASE_URL + "/api/auth/aboutMe", {
        headers: {
            authorization: "Bearer " + req.cookies.access_token
        }
    }).then(res => res.json())
    if (data.id) return NextResponse.redirect(process.env.BASE_URL + "/")
    else return NextResponse.next()
}