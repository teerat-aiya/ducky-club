import { aggregate, createItem, readItem, readItems } from "@directus/sdk";
import { createFactory } from "hono/factory";
import { logger } from "hono/logger";
import * as _ from "lodash";
import { date } from "zod";
import { Env } from "~/types/hono.types";

const factory = createFactory<Env>();

// pushMessage
export const pushMessage = factory.createHandlers(logger(), async (c) => {
  const directus = c.get("directus");
  const { uid, messages = [], schedule } = await c.req.json();

  // create outbox
  await directus.request(
    createItem("outbox", {
      uid,
      payload: {
        messages,
      },
      schedule: schedule || new Date().toISOString(),
      status: "Pending",
    })
  );

  return c.json({});
});
