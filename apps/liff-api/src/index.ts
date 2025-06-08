import { Hono } from "hono";

import { authRoutes } from "./routes/auth.route";
import { meRoutes } from "./routes/me.route";
import { riskAssessmentRoute } from "./routes/risk-assessment.route";
import { satisfactionRoute } from "./routes/satisfaction.route";
import { testKitReqRoute } from "./routes/test-kit-request.route";

import { userProfileRoute } from "./routes/user-profile.route";

import { authMiddleware } from "./middlewares/auth.middleware";
import { advanceProfileRoute } from "./routes/advance-profile.route";
import { deliveryRoute } from "./routes/delivery.route";
import { fileRoutes } from "./routes/file";
import { medRecordRoute } from "./routes/med-record.route";
import { testResultRoutes } from "./routes/test-result.route";
import { Env } from "./types/hono.types";
import { consultationTopicRoute } from "./routes/consultation-topic.route";
import { consultationRecordRoute } from "./routes/consultation-record.route";

const app = new Hono<Env>()
  .basePath("/api")
  .get("/health", (c) => {
    return c.json({ status: "liff-api is ok" });
  })
  .use("*", async (c, next) => {
    if (
      !c.req.path.startsWith("/api/auth") &&
      !c.req.path.startsWith("/api/files") &&
      !c.req.path.startsWith("/api/advanced-profiles/insert") &&
      !c.req.path.startsWith("/api/user-profiles/insert")
    ) {
      return authMiddleware(c, next);
    }
    await next();
  })
  // .get(
  //   "*",
  //   cache({
  //     cacheName: "my-app",
  //     cacheControl: "max-age=15",
  //   })
  // )
  .route("/auth", authRoutes)
  .route("/test-kit-requests", testKitReqRoute)
  .route("/risk-assessments", riskAssessmentRoute)
  .route("/user-profiles", userProfileRoute )
  .route("/advanced-profiles", advanceProfileRoute)
  .route("/test-results",testResultRoutes)
  .route("/files", fileRoutes)
  .route("/deliveries",deliveryRoute)
  .route("/med-records", medRecordRoute)
  .route("/satisfactions", satisfactionRoute)
  .route("/consultation-topics", consultationTopicRoute)
  .route("/consultation-records", consultationRecordRoute)
  .route("/me", meRoutes)
  .onError((err, c) => {
    return c.json({ error: err.message });
  });

export default app;
