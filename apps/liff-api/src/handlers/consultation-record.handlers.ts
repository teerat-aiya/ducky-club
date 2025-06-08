import {
  createItem,
  readItems} from "@directus/sdk";
import { formatDateBangkok } from "@repo/shared/utils";
import { createFactory } from "hono/factory";
import { logger } from "hono/logger";
import { Env } from "~/types/hono.types";

const factory = createFactory<Env>();

export const getConsultationRecords = factory.createHandlers(logger(), async (c) => {
  try {
    const directus = c.get("directAdmin");
    
    const items = await directus.request(
      readItems("consultation_record", {
        fields: ["id", "uid", "consultation_topics"],
      })
    );
    
    return c.json(items);
  } catch (error) {
    console.error("Error fetching consultation records:", error);
    return c.json(
      { error: "An error occurred while fetching consultation records", details: error },
      500
    );
  }
});

export const createConsultationRecord = factory.createHandlers(logger(), async (c) => {
  try {
    const directus = c.get("directAdmin");
    const body = await c.req.json();
    const { id } = c.get("jwtPayload");
    
    body["uid"] = id;
    const consultation_date = formatDateBangkok();
    body["consultation_date"] = consultation_date;
    
    const result = await directus.request(createItem("consultation_record", body));
    
    return c.json(result);
  } catch (error) {
    console.error("Error creating consultation record:", error);
    return c.json(
      { error: "An error occurred while creating the consultation record", details: error },
      500
    );
  }
});

export const getUserConsultationRecords = factory.createHandlers(logger(), async (c) => {
  try {
    const directus = c.get("directAdmin");
    const { id } = c.get("jwtPayload");
    
    const items = await directus.request(
      readItems("consultation_record", {
        fields: ["id", "consultation_topics", "additional_notes", "consultation_date", "status"],
        filter: {
          uid: { _eq: id }
        }
      })
    );
    
    return c.json(items);
  } catch (error) {
    console.error("Error fetching user consultation records:", error);
    return c.json(
      { error: "An error occurred while fetching user consultation records", details: error },
      500
    );
  }
});
