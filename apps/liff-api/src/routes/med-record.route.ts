import { Hono } from "hono";
import * as medHandler from "~/handlers/med-record.handlers";
import { directusAdminMiddleware } from "~/middlewares/directus-admin.middleware";
import { Env } from "~/types/hono.types";

const medRecordRoute = new Hono<Env>()
    .get("/test-result/:test_result_id", directusAdminMiddleware, ...medHandler.getByTestResultId)

export { medRecordRoute };

