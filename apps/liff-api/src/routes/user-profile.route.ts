import { Hono } from "hono";
import * as userProfileHandler from "~/handlers/user-profile.handlers";
import { directusAdminMiddleware } from "~/middlewares/directus-admin.middleware";
import { Env } from "~/types/hono.types";

const userProfileRoute = new Hono<Env>()
    .patch("/", directusAdminMiddleware, ...userProfileHandler.postUserProfileEdit)
    .post("/insert", directusAdminMiddleware, ...userProfileHandler.postUserProfileInsert)



export { userProfileRoute };

