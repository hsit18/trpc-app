import { z } from 'zod';
import { router, publicProcedure } from '../config/trpc'

export const userRouter = router({
    list: publicProcedure.query(async (req) => {
        const users = await req.ctx.prisma.user.findMany();
        return { users };
    }),
    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async (req) => {
            const user = await req.ctx.prisma.user.findUnique({
                where: {
                    id: req.input.id,
                }
            });
            return user;
        }),
    create: publicProcedure
        .input(z.object({ name: z.string().min(5), email: z.string().email() }))
        .output(z.any())
        .mutation(async (req) => {
            const user = await req.ctx.prisma.user.create({
                data: req.input,
            });
            return user;
        }),
    delete: publicProcedure
        .input(z.object({ id: z.string() }))
        .output(z.object({ status: z.boolean() }))
        .mutation(async (req) => {
            const deleteUser = await req.ctx.prisma.user.delete({
                where: {
                    id: req.input.id,
                }
            });
            return { status: deleteUser?.id ? true : false }
        })
});

