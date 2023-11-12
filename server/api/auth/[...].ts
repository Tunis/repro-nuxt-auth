import {NuxtAuthHandler} from '#auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import {DefaultSession, ISODateString} from "next-auth/src/core/types";
import {JWT} from "next-auth/jwt";

type ILoginPayload = {
    username: string;
    password: string;
    grant_type: 'password';
    client_id: string;
    client_secret: string;
    scope: string;
}
type IRefreshPayload = {
    refresh_token: string;
    grant_type: 'refresh_token';
    client_id: string;
    client_secret: string;
    scope: string;
}
type ILoginResponse = {
    access_token: string
    expires_in: number
    token_type: "Bearer"
    scope: string
    refresh_token: string
}
type IUser = {
    id: number
    groups?: any[]
    last_login?: string
    is_superuser?: boolean
    username: string
    first_name: string
    last_name: string
    email: string
    is_staff?: boolean
    is_active?: boolean
    date_joined?: string
    history_json?: any
    type_s?: string
    superviseur_fk?: any
    user_permissions?: string[]
}
type IError = {
    detail?: string
    error?: string
}

export interface ISession extends DefaultSession {
    user?: Partial<IUser>
    expires: ISODateString
    access_token: string
    token_type: string
}

const config = useRuntimeConfig()

export default NuxtAuthHandler({
    // secret needed to run nuxt-auth in production mode (used to encrypt data)
    secret: process.env.NUXT_SECRET,
    pages: {
        // Change the default behavior to use `/login` as the path for the sign-in page
        signIn: '/auth/login',
    },
    providers: [
        // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
        CredentialsProvider.default({
            name: "api_auth",
            id: "api_auth",
            credentials: {
                email: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials: any) {
                console.log('credentials', credentials)
                try {
                    const payload: ILoginPayload = {
                        username: credentials.username,
                        password: credentials.password,
                        grant_type: "password",
                        client_id: config.CLIENT_ID,
                        client_secret: config.CLIENT_SECRET,
                        scope: config.CLIENT_SCOPE,
                    }
                    const authResponse = await getToken(payload)
                    const user = await getUserDetails(authResponse)
                    const date = new Date()
                    return {
                        user: user,
                        access_token: authResponse.access_token,
                        expires_in: date.setSeconds(date.getSeconds() + authResponse.expires_in),
                        refresh_token: authResponse.refresh_token,
                        token_type: authResponse.token_type,
                    }
                } catch (error) {
                    console.warn("Error logging in", error)
                    return null
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({token, user, account}) {
            if (account && user) {
                const {access_token, expires_in, refresh_token, token_type, ...userData} = account
                token = {
                    user: userData,
                    access_token,
                    expires_in,
                    refresh_token,
                    token_type,
                }
            }
            if (token.expires_in && Date.now() > (token.expires_in as number)) {
                console.log('refresh token please')
                const refreshPayload: IRefreshPayload = {
                    refresh_token: token.refresh_token as string,
                    grant_type: 'refresh_token',
                    client_id: config.CLIENT_ID,
                    client_secret: config.CLIENT_SECRET,
                    scope: config.CLIENT_SCOPE,
                }
                const refreshResponse = await getToken(refreshPayload)
                const date = new Date()
                token = {
                    ...token,
                    ...{
                        access_token: refreshResponse.access_token,
                        expires_in: date.setSeconds(date.getSeconds() + refreshResponse.expires_in),
                        refresh_token: refreshResponse.refresh_token,
                        token_type: refreshResponse.token_type,
                    },
                }
            }
            return {
                ...token,
                ...user,
            }
        },
        async session({session, token}): Promise<ISession> {
            return {
                user: token.user as IUser,
                expires: token.expires as string,
                access_token: token.access_token as string,
                token_type: token.token_type as string,
            }
        },
    },
});

function getResponse<T extends {}>(response: T | IError): T {
    if ('error' in response) {
        throw createError({
            statusCode: 401,
            statusMessage: response.error,
        });
    } else {
        return response as T
    }
}

function getUserResponse(response: IUser[]): IUser {
    return response[0]
}

async function getUserDetails(token: ILoginResponse | JWT) {
    const userDetails = await $fetch<IError | IUser[]>(`${config.API_BASE_URL}/user/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${token.token_type} ${token?.access_token}`,
        },
    });
    const userResponse = getResponse(userDetails)
    return getUserResponse(userResponse)
}

async function getToken(payload: ILoginPayload | IRefreshPayload) {
    const loginResponse = await $fetch<IError | ILoginResponse>(`${config.API_BASE_URL}/o/token/`, {
        method: "POST",
        body: payload,
        headers: {
            "Content-Type": "application/json",
        },
    });
    return getResponse(loginResponse)
}