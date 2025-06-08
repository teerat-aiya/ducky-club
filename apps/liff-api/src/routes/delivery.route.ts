import { Hono } from "hono";
import { directusAdminMiddleware } from "~/middlewares/directus-admin.middleware";
import { Env } from "~/types/hono.types";
import * as deliveryHandler from "../handlers/delivery.handlers";

const deliveryRoute = new Hono<Env>()
    .get("/user", directusAdminMiddleware, ...deliveryHandler.getDeliveryByUser)
    .get("/latest", directusAdminMiddleware, ...deliveryHandler.getLatestDelivery)
    .get("/:id", directusAdminMiddleware, ...deliveryHandler.getDelivery)

export { deliveryRoute };

