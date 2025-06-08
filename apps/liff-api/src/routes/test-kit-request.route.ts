import { Hono } from "hono";
import { directusAdminMiddleware } from "~/middlewares/directus-admin.middleware";
import { Env } from "~/types/hono.types";
import * as testKitHandler from "../handlers/test-kit-request.handlers";

const testKitReqRoute = new Hono<Env>()
  .get("/user", directusAdminMiddleware, ...testKitHandler.getTestKitReqByUid)
  .get(
    "/latest",
    directusAdminMiddleware,
    ...testKitHandler.getLatestTestKitReq
  )
  .get("/:id", directusAdminMiddleware, ...testKitHandler.getTestKitReqDetail)

  .post("/", directusAdminMiddleware, ...testKitHandler.postInsertTestKitReq);

export { testKitReqRoute };
