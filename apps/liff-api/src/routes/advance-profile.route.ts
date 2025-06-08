import { Hono } from "hono";
import * as advanceProfileHandler from "~/handlers/advanced-profile.handlers";
import { directusAdminMiddleware } from "~/middlewares/directus-admin.middleware";
import { Env } from "~/types/hono.types";

const advanceProfileRoute = new Hono<Env>()
    .post("/insert", directusAdminMiddleware, ...advanceProfileHandler.postAdvProfileInsert)

export { advanceProfileRoute };

