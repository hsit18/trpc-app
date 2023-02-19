"use strict";
exports.__esModule = true;
exports.rootRouter = void 0;
var trpc_1 = require("../config/trpc");
var observable_1 = require("@trpc/server/observable");
var zod_1 = require("zod");
var greetingRouter = (0, trpc_1.router)({
    hello: trpc_1.publicProcedure
        .input(zod_1.z.object({
        name: zod_1.z.string()
    }))
        .query(function (_a) {
        var input = _a.input;
        return "Hello, ".concat(input.name, "!");
    })
});
var appRouter = (0, trpc_1.router)({
    health: trpc_1.publicProcedure.query(function () { return ({ msg: 'server running...' }); }),
    randomNumber: trpc_1.publicProcedure.subscription(function () {
        console.log('hello22');
        return (0, observable_1.observable)(function (emit) {
            console.log('hello11');
            var timer = setInterval(function () {
                // emits a number every second
                console.log('hello');
                emit.next({ randomNumber: Math.random() });
            }, 200);
            // return () => {
            //   clearInterval(timer);
            // };
        });
    })
});
exports.rootRouter = (0, trpc_1.router)({
    greeting: greetingRouter,
    app: appRouter
});
