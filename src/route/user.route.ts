import { z } from 'zod';
import { router, publicProcedure } from '../config/trpc'

export const userRouter = router({
    getUsers: publicProcedure
        .meta({
            openapi: {
                method: 'GET',
                path: '/getUsers',
                tags: ['users'],
                summary: 'Get all users with posts',
            },
        })
        .input(z.object({ id: z.string() }).optional())
        .output(z.object({ users: z.object({ id: z.any(), name: z.string().nullable(), email: z.string().email(), password: z.string().nullable(), posts: z.any() }).array() }))
        .query(async (req) => {
            const users = await req.ctx.prisma.user.findMany({
                include: { posts: true },
            });
            return { users };
        }),
    getUserById: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async (req) => {
            const user = await req.ctx.prisma.user.findUnique({
                where: {
                    id: req.input.id,
                }
            });
            return user;
        }),
    createUser: publicProcedure
        .meta({
            openapi: {
                method: 'POST',
                path: '/user/create',
                tags: ['users'],
                summary: 'Create new user',
            },
        })
        .input(z.object({ name: z.string().min(5), email: z.string().email() }))
        .output(z.object({ id: z.any(), name: z.string().nullable(), email: z.string().email() }))
        .mutation(async (req) => {
            const user = await req.ctx.prisma.user.create({
                data: req.input,
            });
            return user;
        }),
    deleteUser: publicProcedure
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

