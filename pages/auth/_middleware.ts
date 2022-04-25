import {NextFetchEvent, NextRequest} from "next/server";

export default function AuthMiddleware(req: NextRequest, ev: NextFetchEvent) {
    return new Response('Hello, world!')
}