import { publicProcedure, router, mergeRouters } from '../config/trpc';
import { userRouter } from './user.route';
import { postRouter } from './post.route';

const appRouter = router({
    health: publicProcedure.query(() => 'server running...'),
});

export const rootRouter = mergeRouters(appRouter, userRouter, postRouter);
export type AppRouter = typeof rootRouter;