import { initTRPC, inferAsyncReturnType } from '@trpc/server';
import { OpenApiMeta } from 'trpc-openapi';
import superjson from 'superjson';
import * as trpcExpress from '@trpc/server/adapters/express';
import { prisma } from './prisma';

export const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => {
    return {
        req,
        res,
        prisma,
    };
};

export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().meta<OpenApiMeta>().create({
    errorFormatter({ shape }) {
        return shape;
    },
});

export const router = t.router;

export const publicProcedure = t.procedure;

export const middleware = t.middleware;

export const mergeRouters = t.mergeRouters;