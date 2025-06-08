import { Hono } from "hono";
import { directusAdminMiddleware } from "~/middlewares/directus-admin.middleware";
import { Env } from "~/types/hono.types";
import * as consultationTopicHandler from "../handlers/consultation-topic.handlers";

const consultationTopicRoute = new Hono<Env>()
  .get("/", directusAdminMiddleware, ...consultationTopicHandler.getConsultationTopics)
  // .get("/:id", directusAdminMiddleware, ...consultationTopicHandler.getConsultationTopic)
  .post("/", directusAdminMiddleware, ...consultationTopicHandler.createConsultationTopic)
  // .patch("/:id", directusAdminMiddleware, ...consultationTopicHandler.updateConsultationTopic)
  // .delete("/:id", directusAdminMiddleware, ...consultationTopicHandler.deleteConsultationTopic);

export { consultationTopicRoute };
