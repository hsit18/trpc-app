import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
    res.json('Express + TypeScript Server');
});

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users)
});

app.post('/users', async (req, res) => {
    const { name, email } = req.body
    const user = await prisma.user.create({
        data: {
            name,
            email
        },
    })
    res.json(user)
})

app.delete('/user/:id', async (req, res) => {
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