import { publicProcedure, router, mergeRouters } from '../config/trpc';
import { userRouter } from './user.route';

const appRouter = router({
    health: publicProcedure.query(() => 'server running...'),
});

export const rootRouter = mergeRouters(appRouter, userRouter);
export type AppRouter = typeof rootRouter;