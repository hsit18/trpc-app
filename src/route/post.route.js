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
exports.postRouter = void 0;
var zod_1 = require("zod");
var trpc_1 = require("../config/trpc");
exports.postRouter = (0, trpc_1.router)({
    getPosts: trpc_1.publicProcedure.query(function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var posts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.ctx.prisma.post.findMany({
                        include: { author: true }
                    })];
                case 1:
                    posts = _a.sent();
                    return [2 /*return*/, { posts: posts }];
            }
        });
    }); }),
    getPostById: trpc_1.publicProcedure
        .input(zod_1.z.object({ id: zod_1.z.string() }))
        .mutation(function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.ctx.prisma.post.findUnique({
                        where: {
                            id: req.input.id
                        }
                    })];
                case 1:
                    post = _a.sent();
                    return [2 /*return*/, post];
            }
        });
    }); }),
    createPost: trpc_1.publicProcedure
        .meta({
        openapi: {
            method: 'POST',
            path: '/createPost',
            tags: ['posts'],
            summary: 'Create new post'
        }
    })
        .input(zod_1.z.object({
        title: zod_1.z.string().min(5),
        content: zod_1.z.string().min(5),
        authorId: zod_1.z.string().min(5)
    }))
        .output(zod_1.z.object({
        id: zod_1.z.string(),
        title: zod_1.z.string().min(5),
        content: zod_1.z.string().min(5).nullable(),
        authorId: zod_1.z.string().min(5),
        createdAt: zod_1.z.date(),
        updatedAt: zod_1.z.date()
    }))
        .mutation(function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var post;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.ctx.prisma.post.create({
                        data: req.input
                    })];
                case 1:
                    post = _a.sent();
                    return [2 /*return*/, post];
            }
        });
    }); }),
    deletePost: trpc_1.publicProcedure
        .input(zod_1.z.object({ id: zod_1.z.string() }))
        .output(zod_1.z.object({ status: zod_1.z.boolean() }))
        .mutation(function (req) { return __awaiter(void 0, void 0, void 0, function () {
        var deletePost;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.ctx.prisma.post["delete"]({
                        where: {
                            id: req.input.id
                        }
                    })];
                case 1:
                    deletePost = _a.sent();
                    return [2 /*return*/, { status: (deletePost === null || deletePost === void 0 ? void 0 : deletePost.id) ? true : false }];
            }
        });
    }); })
});
