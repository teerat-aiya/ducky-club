import { Hono } from "hono";
import { directusAdminMiddleware } from "~/middlewares/directus-admin.middleware";
import * as satisfactionHandler from "../handlers/satisfaction.handler";

const satisfactionRoute = new Hono()
    .post("/", directusAdminMiddleware, ...satisfactionHandler.insertSatisfaction);

export { satisfactionRoute };
