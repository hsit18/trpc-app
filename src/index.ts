import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './server';

const prisma = new PrismaClient();
const app = express();
const port = 3000;

const createContext = ({
    req,
    res,
}: trpcExpress.CreateExpressContextOptions) => ({ req, res }); // no context
type Context = inferAsyncReturnType<typeof createContext>;
const t = initTRPC.context<Context>().create();


app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
        router: appRouter,
        createContext,
    }),
);

app.delete('/user/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const user = await prisma.user.delete({
        where: {
            id,
        },
    })
    res.json(user)
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});