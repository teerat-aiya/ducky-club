import { Hono } from "hono";
import { directusMiddleware } from "~/middlewares/directus.middleware";
import { Env } from "~/types/hono.types";
import * as lineHandler from "../handlers/line.handlers";

const lineRoutes = new Hono<Env>()
.post("/push", directusMiddleware, ...lineHandler.pushMessage)


export { lineRoutes };

