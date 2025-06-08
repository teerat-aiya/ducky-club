import { readItem, readItems } from "@directus/sdk";
import { createFactory } from "hono/factory";
import { logger } from "hono/logger";
import * as _ from "lodash";
import { Env } from "~/types/hono.types";

const factory = createFactory<Env>();

export const getDelivery = factory.createHandlers(logger(), async (c) => {
  const directus = c.get("directAdmin");
  const { id } = c.req.param();

  try {
    const item = await directus.request(
      readItem("delivery_status", id, {
        fields: [
          "status",
          "tracking_number",
          {
            test_kit_request_id: [
              "id",
              "recipient_name",
              "recipient_phone",
              "date_created",
              "recipient_address",
              "house_number",
              "moo",
              "village",
              "soi",
              "street",
              "sub_district",
              "city",
              "province",
              "recipient_zipcode",
              {
                risk_assessment_id: ["last_test_high_risk", "submission_date"],
              },
            ],
          },
        ],
      })
    );
    const { test_kit_request_id, ...rest } = item;
    const { risk_assessment_id, ...testKitRest } = test_kit_request_id ?? {};

    return c.json({
      ...rest,
      test_kit_request_id: testKitRest,
      risk_assessment: risk_assessment_id ?? null,
    });
  } catch (error) {
    console.error(`Error fetching delivery status: `, error);
    return c.json({ error: "Failed to fetch delivery status." }, 500);
  }
});

export const getDeliveryByUser = factory.createHandlers(logger(), async (c) => {
  const directus = c.get("directAdmin");
  const { id } = c.get("jwtPayload");
  const items = await directus.request(
    readItems("delivery_status", {
      fields: [
        "id",
        "status",
        "tracking_number",
        {
          test_kit_request_id: [
            "id",
            "recipient_name",
            "recipient_address",
            "house_number",
            "moo",
            "village",
            "soi",
            "street",
            "sub_district",
            "city",
            "province",
            "recipient_zipcode",
            "request_date",
          ],
        },
      ],
      filter: {
        test_kit_request_id: {
          uid: {
            _eq: id,
          },
        },
      },
    })
  );
  return c.json(items);
});

export const getLatestDelivery = factory.createHandlers(logger(), async (c) => {
  const directus = c.get("directAdmin");
  const { id } = c.get("jwtPayload");

  // const { uid } = c.req.query();
  const items = await directus.request(
    readItems("delivery_status", {
      fields: [
        "id",
        "status",
        "tracking_number",
        "test_kit_request_id"
      ],
      filter: {
        test_kit_request_id: {
          uid: {
            _eq: id,
          },
        },
      },
      sort: ["-date_created"],
      limit: 1,
    })
  );
  return c.json(items.length > 0 ? items[0] : null);
});
