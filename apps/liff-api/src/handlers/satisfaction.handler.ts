import { createItems, readItems } from "@directus/sdk";
import { formatDateBangkok } from "@repo/shared/utils";
import { createFactory } from "hono/factory";
import { Env } from "~/types/hono.types";

const factory = createFactory<Env>();

export const insertSatisfaction = factory.createHandlers(async (c) => {
    try {
        const directus = c.get("directAdmin");
        const { id } = c.get("jwtPayload");
        const body = await c.req.json();
        body.uid = id;
        const dateTime = formatDateBangkok();
        body["submission_date"] = dateTime;
        const result = await directus.request(
            createItems("satisfaction_survey", body)
        );
        return c.json(result);
    } catch (error) {
        console.error(error);
        return c.json({ error });
    }
});
