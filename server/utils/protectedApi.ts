import type { EventHandler, EventHandlerRequest } from 'h3'
import {getServerSession} from "#auth";
import {ISession} from "~/server/api/auth/[...]";

export const protectedApi = <T extends EventHandlerRequest, D> (
    handler: EventHandler<T, D>
): EventHandler<T, D> =>
    defineEventHandler<T>(async event => {
        try {
            const token = await getServerSession(event) as ISession | null
            if(!token) {
                throw createError({
                    statusCode: 401,
                    statusMessage: 'error.session.unauthorized',
                })
            }
            event.context.auth = token
            const response = await handler(event)
            return { response }
        } catch (err: any) {
            throw createError({
                statusCode: err.statusCode,
                statusMessage: err.message,
            })
        }
    })