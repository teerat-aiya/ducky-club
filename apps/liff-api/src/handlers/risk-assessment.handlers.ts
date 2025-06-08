import { formatDateBangkok, randomString } from "@repo/shared/utils";
import { createFactory } from "hono/factory";
import { logger } from "hono/logger";
import { Env } from "~/types/hono.types";

import {
    createItems,
    readItems
} from "@directus/sdk";

const factory = createFactory<Env>();

export const postInsertRiskAssessment = factory.createHandlers(
    logger(),
    async (c) => {
        try {
            const directus = c.get("directAdmin");
            const body = await c.req.json();

            const ranId = randomString(8);
            body["id"] = ranId;

            const dateTime = formatDateBangkok();
            body["submission_date"] = dateTime;

            const result = await directus.request(
                createItems("risk_assessment", body)
            );
            return c.json(result);
        } catch (error) {
            console.error(error);
            return c.json({ error });
        }
    }
);
export const getLatestRiskAssessment = factory.createHandlers(logger(), async (c) => {
    const directus = c.get("directAdmin");
    const { id } = c.get("jwtPayload");

    // const { uid } = c.req.query();
    const items = await directus.request(readItems("risk_assessment", {
        fields: ["id","uid", "risk_result", "last_test_high_risk", "submission_date"],
        filter: {
            uid: {
                _eq: id
            }
        },
        sort: ["-submission_date"],
        limit: 1
    }));
    return c.json(items[0]);
});

export const getRiskAssessmentsByUid = factory.createHandlers(logger(), async (c) => {
    const directus = c.get("directAdmin");
    const { id } = c.get("jwtPayload");

    // const { uid } = c.req.query();
    const items = await directus.request(readItems("risk_assessment", {
        filter: {
            uid: {
                _eq: id
            }
        },
        sort: ["-submission_date"],
    }));
    return c.json(items);
});
