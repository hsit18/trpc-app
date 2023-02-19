import { initTRPC, inferAsyncReturnType } from '@trpc/server';
import { OpenApiMeta } from 'trpc-openapi';
import * as trpcExpress from '@trpc/server/adapters/express';
import { prisma } from './prisma';
import {
    CreateWSSContextFnOptions,
} from '@trpc/server/adapters/ws';

export const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions | CreateWSSContextFnOptions) => {
    return {
        req,
        res,
        prisma,
    };
};

export type Context = inferAsyncReturnType<typeof createContext>;

export const t = initTRPC.context<Context>().meta<OpenApiMeta>().create();

export const router = t.router;

export const publicProcedure = t.procedure;

export const middleware = t.middleware;

export const mergeRouters = t.mergeRouters;