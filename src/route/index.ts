import { publicProcedure, router, mergeRouters } from '../config/trpc';
import { userRouter } from './user.route';
import { postRouter } from './post.route';
import { observable } from '@trpc/server/observable';
import { z } from 'zod';

const greetingRouter = router({
    hello: publicProcedure
        .input(
            z.object({
                name: z.string(),
            })
        )
        .query(({ input }) => `Hello, ${input.name}!`),
});

const appRouter = router({
    health: publicProcedure.query(() => ({ msg: 'server running...' })),
    randomNumber: publicProcedure.subscription(() => {
        console.log('hello22');
        return observable<{ randomNumber: number }>((emit) => {
            console.log('hello11');
            const timer = setInterval(() => {
                // emits a number every second
                console.log('hello');
                emit.next({ randomNumber: Math.random() });
            }, 200);

            // return () => {
            //   clearInterval(timer);
            // };
        });
    }),
});

export const rootRouter = router({
    greeting: greetingRouter,
    app: appRouter,
  });

// export const rootRouter = mergeRouters(greetingRouter, appRouter, userRouter, postRouter);
export type AppRouter = typeof rootRouter;