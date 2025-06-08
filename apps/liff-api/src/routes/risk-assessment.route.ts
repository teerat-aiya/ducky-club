import { Hono } from "hono";
import * as riskAssessmentHandler from "~/handlers/risk-assessment.handlers";
import { directusAdminMiddleware } from "~/middlewares/directus-admin.middleware";
import { Env } from "~/types/hono.types";

const riskAssessmentRoute = new Hono<Env>()
    .get("/user", directusAdminMiddleware, ...riskAssessmentHandler.getRiskAssessmentsByUid)
    .get("/latest", directusAdminMiddleware, ...riskAssessmentHandler.getLatestRiskAssessment)
    .post("/",directusAdminMiddleware,...riskAssessmentHandler.postInsertRiskAssessment)


export { riskAssessmentRoute };

