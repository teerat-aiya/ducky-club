import { createItem, updateItem, readItems } from "@directus/sdk";
import { createFactory } from "hono/factory";
import { logger } from "hono/logger";
import { Env } from "~/types/hono.types";

const factory = createFactory<Env>();

export const postUserProfileEdit = factory.createHandlers(
  logger(),
  async (c) => {
    const directus = c.get("directAdmin");
    const { id } = c.get("jwtPayload");
    console.log(id);
    const body = await c.req.json();
    await directus.request(updateItem("user_profile", id, body));
    return c.json({});
  }
);

export const postUserProfileInsert = factory.createHandlers(
  logger(),
  async (c) => {
    try {
      const directus = c.get("directAdmin");
      const body = await c.req.json();

      // Check if user profile already exists using uid
      const uid = body.uid;
      if (!uid) {
        return c.json({ error: "Missing uid for user" }, 400);
      }

      // Query to find existing user with the same uid
      const existingUsers = await directus.request(
        readItems("user_profile", {
          filter: {
            uid: uid,
          },
          limit: 1,
        })
      );

      // Check if user exists
      if (existingUsers && existingUsers.length > 0) {
        return c.json(
          {
            error: "User profile already exists",
          },
          409
        ); // 409 Conflict
      }

      // Create user if not exists
      await directus.request(createItem("user_profile", body));
      return c.json({ success: true });
    } catch (error) {
      console.error("Error in postUserProfileInsert:", error);
      return c.json({ error: "Failed to insert user profile" }, 500);
    }
  }
);
