import express from 'express';
import http from 'http';
import swaggerUi from "swagger-ui-express";
import * as trpcExpress from '@trpc/server/adapters/express';
import { rootRouter, AppRouter } from './route';
import { createContext } from './config/trpc';
import { createOpenApiExpressMiddleware } from 'trpc-openapi';
import {
    applyWSSHandler,
} from '@trpc/server/adapters/ws';
import ws from 'ws';

import { openApiDocument } from './config/openApi';

const app = express();
const port = 3000;

app.use(
    '/api',
    trpcExpress.createExpressMiddleware({
        router: rootRouter,
        createContext,
        onError({ error }) {
            console.error('Error:', error);
        }
    }),
);

app.use('/openapi', createOpenApiExpressMiddleware({ router: rootRouter, createContext }));

app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(openApiDocument));

const server = http.createServer(app);

const wss = new ws.Server({ server });
applyWSSHandler<AppRouter>({
    wss,
    router: rootRouter,
    createContext,
});

wss.on('connection', (ws) => {
    console.log(`➕➕ Connection (${wss.clients.size})`);
    ws.once('close', () => {
        console.log(`➖➖ Connection (${wss.clients.size})`);
    });
});
console.log('✅ WebSocket Server listening on ws://localhost:3000');

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
