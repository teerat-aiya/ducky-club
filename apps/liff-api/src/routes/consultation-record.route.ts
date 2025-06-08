import { Hono } from "hono";
import { directusAdminMiddleware } from "~/middlewares/directus-admin.middleware";
import { Env } from "~/types/hono.types";
import * as consultationRecordHandler from "../handlers/consultation-record.handlers";

const consultationRecordRoute = new Hono<Env>()
  .get("/", directusAdminMiddleware, ...consultationRecordHandler.getConsultationRecords)
  .post("/", directusAdminMiddleware, ...consultationRecordHandler.createConsultationRecord)

export { consultationRecordRoute };
