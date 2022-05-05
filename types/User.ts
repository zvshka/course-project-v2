export type User = {
    id: string
    username: string
    email: string
    email_verified: Date
    github: any
    firstname: string | null
    lastname: string | null
    avatarURL: string | null
    role: "USER" | "ADMIN"
}