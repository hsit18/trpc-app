"use strict";
exports.__esModule = true;
exports.mergeRouters = exports.middleware = exports.publicProcedure = exports.router = exports.t = exports.createContext = void 0;
var server_1 = require("@trpc/server");
var prisma_1 = require("./prisma");
var createContext = function (_a) {
    var req = _a.req, res = _a.res;
    return {
        req: req,
        res: res,
        prisma: prisma_1.prisma
    };
};
exports.createContext = createContext;
exports.t = server_1.initTRPC.context().meta().create();
exports.router = exports.t.router;
exports.publicProcedure = exports.t.procedure;
exports.middleware = exports.t.middleware;
exports.mergeRouters = exports.t.mergeRouters;
