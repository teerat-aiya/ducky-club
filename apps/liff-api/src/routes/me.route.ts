import { Hono } from "hono";
import { directusAdminMiddleware } from "~/middlewares/directus-admin.middleware";
import { Env } from "~/types/hono.types";
import * as meHadlers from "../handlers/me.handlers";

const meRoutes = new Hono<Env>()
  .get("/", directusAdminMiddleware, ...meHadlers.getMe)
  .patch("/", directusAdminMiddleware, ...meHadlers.updateMe);

export { meRoutes };

