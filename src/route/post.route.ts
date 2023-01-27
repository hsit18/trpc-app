import { Post } from '@prisma/client';
import { z } from 'zod';
import { router, publicProcedure } from '../config/trpc'

export const postRouter = router({
    getPosts: publicProcedure.query(async (req) => {
        const posts = await req.ctx.prisma.post.findMany({
            include: { author: true },
        });
        return { posts };
    }),
    getPostById: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async (req) => {
            const post = await req.ctx.prisma.post.findUnique({
                where: {
                    id: req.input.id,
                }
            });
            return post;
        }),
    createPost: publicProcedure
        .meta({
            openapi: {
                method: 'POST',
                path: '/createPost',
                tags: ['posts'],
                summary: 'Create new post',
            },
        })
        .input(z.object({
            title: z.string().min(5),
            content: z.string().min(5),
            authorId: z.string().min(5),
        }))
        .output(z.object({
            id: z.string(),
            title: z.string().min(5),
            content: z.string().min(5).nullable(),
            authorId: z.string().min(5),
            createdAt: z.date(),
            updatedAt: z.date()
        }))
        .mutation(async (req) => {
            const post: Post = await req.ctx.prisma.post.create({
                data: req.input,
            });
            return post;
        }),
    deletePost: publicProcedure
        .input(z.object({ id: z.string() }))
        .output(z.object({ status: z.boolean() }))
        .mutation(async (req) => {
            const deletePost = await req.ctx.prisma.post.delete({
                where: {
                    id: req.input.id,
                }
            });
            return { status: deletePost?.id ? true : false }
        })
});

