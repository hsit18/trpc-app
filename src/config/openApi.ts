import { generateOpenApiDocument } from 'trpc-openapi';

import { rootRouter } from '../route';

// Generate OpenAPI schema document
export const openApiDocument = generateOpenApiDocument(rootRouter, {
    title: 'Example CRUD API',
    description: 'OpenAPI compliant REST API built using tRPC with Express',
    version: '1.0.0',
    baseUrl: 'http://localhost:3000/api',
    docsUrl: 'https://github.com/jlalmes/trpc-openapi',
    tags: ['auth', 'users', 'posts'],
});