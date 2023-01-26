import express from 'express';
import swaggerUi from "swagger-ui-express";
import * as trpcExpress from '@trpc/server/adapters/express';
import { rootRouter } from './route';
import { createContext } from './config/trpc';
import { createOpenApiExpressMiddleware } from 'trpc-openapi';

import { openApiDocument } from './config/openApi';

const app = express();
const port = 3000;

app.use(
    '/api',
    trpcExpress.createExpressMiddleware({
        router: rootRouter,
        createContext,
    }),
);

app.use('/openapi', createOpenApiExpressMiddleware({ router: rootRouter, createContext }));

app.use('/', swaggerUi.serve);
app.get('/', swaggerUi.setup(openApiDocument));

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});