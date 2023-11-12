import {useSessionToken} from "~/server/utils/useSessionToken";

const handler = defineEventHandler(async (event) => {
    const config = useRuntimeConfig()

    return event.$fetch<{
        lang: string,
        updated_at: Date
    } | null>(`${config.API_BASE_URL}/user/`, {
        headers: {
            ...useSessionToken(event.context.auth),
        }
    })
})

export default protectedApi(handler)