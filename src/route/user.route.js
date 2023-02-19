"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.userRouter = void 0;
var zod_1 = require("zod");
var trpc_1 = require("../config/trpc");
exports.userRouter = (0, trpc_1.router)({
    getUsers: trpc_1.publicProcedure
        .meta({
        openapi: {
            method: 'GET',
            path: '/getUsers',
            tags: ['users'],
            summary: 'Get all users with posts'
        }
    })
        .input(zod_1.z["void"]())
        .output(zod_1.z.object({ users: zod_1.z.object({ id: zod_1.z.any(), name: zod_1.z.string().nullable(), email: zod_1.z.string().email(), password: zod_1.z.string().nullable(), posts: zod_1.z.any() }).array() }))
        .query(function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.ctx.prisma.user.findMany({
                        include: { posts: true }
                    })];
                case 1:
                    users = _a.sent();
                    return [2 /*return*/, { users: users }];
            }
        });
    }); }),
    getUserById: trpc_1.publicProcedure
        .input(zod_1.z.object({ id: zod_1.z.string() }))
        .mutation(function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.ctx.prisma.user.findUnique({
                        where: {
                            id: req.input.id
                        }
                    })];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user];
            }
        });
    }); }),
    createUser: trpc_1.publicProcedure
        .meta({
        openapi: {
            method: 'POST',
            path: '/user/create',
            tags: ['users'],
            summary: 'Create new user'
        }
    })
        .input(zod_1.z.object({ name: zod_1.z.string().min(5), email: zod_1.z.string().email() }))
        .output(zod_1.z.object({ id: zod_1.z.any(), name: zod_1.z.string().nullable(), email: zod_1.z.string().email() }))
        .mutation(function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.ctx.prisma.user.create({
                        data: req.input
                    })];
                case 1:
                    user = _a.sent();
                    return [2 /*return*/, user];
            }
        });
    }); }),
    deleteUser: trpc_1.publicProcedure
        .input(zod_1.z.object({ id: zod_1.z.string() }))
        .output(zod_1.z.object({ status: zod_1.z.boolean() }))
        .mutation(function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var deleteUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.ctx.prisma.user["delete"]({
                        where: {
                            id: req.input.id
                        }
                    })];
                case 1:
                    deleteUser = _a.sent();
                    return [2 /*return*/, { status: (deleteUser === null || deleteUser === void 0 ? void 0 : deleteUser.id) ? true : false }];
            }
        });
    }); })
});
