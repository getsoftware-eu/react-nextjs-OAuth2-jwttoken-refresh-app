import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        name: string,
        accessToken: string,
        refreshToken: string
    }

    interface Session {
        user: {
            name: string
        }
    }
}