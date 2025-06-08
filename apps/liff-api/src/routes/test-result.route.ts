import { Hono } from "hono";
import { directusAdminMiddleware } from "~/middlewares/directus-admin.middleware";
import { Env } from "~/types/hono.types";
import * as testResultHandler from "../handlers/test-result.handlers";

const testResultRoutes = new Hono<Env>()
    .get("/test-kit-request/:id", directusAdminMiddleware, ...testResultHandler.getByTestKitRequestId)
    .get("/user", directusAdminMiddleware, ...testResultHandler.getTestResultByUid)
    .get("/latest", directusAdminMiddleware, ...testResultHandler.getLatestTestResult)
    .get("/:id", directusAdminMiddleware, ...testResultHandler.getTestResultDetail)
    .patch("/", directusAdminMiddleware, ...testResultHandler.patchUpdateTestResult)
    // .post("/insert", directusAdminMiddleware, ...testResultHandler.postInsertTestResult)

export { testResultRoutes };