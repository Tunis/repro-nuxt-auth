import {ISession} from "~/server/api/auth/[...]";

export const useSessionToken = (session: ISession) => {
    return {
        'Authorization': `${session.token_type} ${session.access_token}`,
    }
}