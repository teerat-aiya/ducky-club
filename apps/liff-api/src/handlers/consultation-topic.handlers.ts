import {
  createItem,
  deleteItem,
  readItem,
  readItems,
  updateItem
} from "@directus/sdk";
import { DirectusError } from "@repo/shared/exceptions/directus";
import { formatDateBangkok } from "@repo/shared/utils";
import { createFactory } from "hono/factory";
import { logger } from "hono/logger";
import { Env } from "~/types/hono.types";
import { randomNumber } from "~/utils/random";

const factory = createFactory<Env>();

export const getConsultationTopics = factory.createHandlers(logger(), async (c) => {
  try {
    const directus = c.get("directAdmin");
    const { status } = c.req.query();
    
    const items = await directus.request(
      readItems("consultation_topics", {
        fields: ["id","topic"],
        filter: { status: { _eq: status ?? "Published" } },
      })
    );
    
    return c.json(items);
  } catch (error) {
    console.error("Error fetching consultation topics:", error);
    return c.json(
      { error: "An error occurred while fetching consultation topics", details: error },
      500
    );
  }
});

// export const getConsultationTopic = factory.createHandlers(logger(), async (c) => {
//   try {
//     const directus = c.get("directAdmin");
//     const { id } = c.req.param();
    
//     const item = await directus.request(
//       readItem("consultation_topic", id)
//     );
    
//     return c.json(item);
//   } catch (error) {
//     const derror = DirectusError.fromDirectusResponse(error);
//     throw derror;
//   }
// });

export const createConsultationTopic = factory.createHandlers(logger(), async (c) => {
  try {
    const directus = c.get("directAdmin");
    const body = await c.req.json();

    // Check if a topic with the same name already exists
    if (body.topic) {
      const existingTopics = await directus.request(
        readItems("consultation_topics", {
          filter: { topic: { _eq: body.topic } },
          limit: 1,
          fields: ["id", "topic", "count"]
        })
      );
      
      if (existingTopics && existingTopics.length > 0) {
        const existingTopic = existingTopics[0];
        // Update count for the existing topic
        const currentCount = existingTopic.count || 1;
        const updatedTopic = await directus.request(
          updateItem("consultation_topics", existingTopic.id!, {
            count: currentCount + 1
          })
        );
        return c.json(updatedTopic);
      }
    }

    const { id } = c.get("jwtPayload");
    body["created_by_user_profile"] = id;
    
    const result = await directus.request(createItem("consultation_topics", body));
    
    return c.json(result);
  } catch (error) {
    console.error("Error creating consultation topic:", error);
    return c.json(
      { error: "An error occurred while creating the consultation topic", details: error },
      500
    );
  }
});

// export const createConsultationTopic = factory.createHandlers(logger(), async (c) => {
//   try {
//     const directus = c.get("directAdmin");
//     const body = await c.req.json();
    
//     let id = "";
//     let isIdDuplicate = true;
    
//     while (isIdDuplicate) {
//       id = "CT" + randomNumber(8);
//       const existing = await directus.request(readItems("consultation_topic", {
//         filter: { id: { _eq: id } },
//         limit: 1
//       }));
//       isIdDuplicate = existing.length > 0;
//     }
    
//     const dateTime = formatDateBangkok();
    
//     const topic = {
//       id,
//       name: body.name,
//       description: body.description || "",
//       active: body.active !== undefined ? body.active : true,
//       date_created: dateTime,
//       date_updated: dateTime,
//       created_by: body.created_by || null
//     };
    
//     const result = await directus.request(createItem("consultation_topic", topic));
    
//     return c.json(result);
//   } catch (error) {
//     console.error("Error creating consultation topic:", error);
//     return c.json(
//       { error: "An error occurred while creating the consultation topic", details: error.message },
//       500
//     );
//   }
// });

// export const updateConsultationTopic = factory.createHandlers(logger(), async (c) => {
//   try {
//     const directus = c.get("directAdmin");
//     const { id } = c.req.param();
//     const body = await c.req.json();
    
//     const dateTime = formatDateBangkok();
    
//     const updates = {
//       ...body,
//       date_updated: dateTime
//     };
    
//     const result = await directus.request(updateItem("consultation_topic", id, updates));
    
//     return c.json(result);
//   } catch (error) {
//     const derror = DirectusError.fromDirectusResponse(error);
//     throw derror;
//   }
// });

// export const deleteConsultationTopic = factory.createHandlers(logger(), async (c) => {
//   try {
//     const directus = c.get("directAdmin");
//     const { id } = c.req.param();
    
//     await directus.request(deleteItem("consultation_topic", id));
    
//     return c.json({ success: true });
//   } catch (error) {
//     const derror = DirectusError.fromDirectusResponse(error);
//     throw derror;
//   }
// });
