import { createItem, readItems, updateItem } from "@directus/sdk";
import { createFactory } from "hono/factory";
import { logger } from "hono/logger";
import { Env } from "~/types/hono.types";


const factory = createFactory<Env>();

export const postAdvProfileInsert = factory.createHandlers(logger(), async (c) => {
    const directus = c.get("directAdmin");
    try {
        const body = await c.req.json();
        const uuid = crypto.randomUUID();
        body["id"] = uuid;
        await directus.request(
            createItem("advanced_profile", body)
        );

        return c.json(1);
    } catch (error) {
        console.error("Error updating advanced profile:", error);
        return c.json(
            0,
            500
        );
    }
});

