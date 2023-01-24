import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const t = initTRPC.create();

export const appRouter = t.router({
    ping: t.procedure.query(() => "pong"),
    getUser: t.procedure.query(async (req) => {
        req.input; // string
        const users = await prisma.user.findMany();
        return { users };
    }),
    createUser: t.procedure
        .input(z.object({ name: z.string().min(5), email: z.string().email() }))
        .mutation(async (req) => {
            return await prisma.user.create({
                data: req.input,
            })
        }),
});

// export type definition of API
export type AppRouter = typeof appRouter;