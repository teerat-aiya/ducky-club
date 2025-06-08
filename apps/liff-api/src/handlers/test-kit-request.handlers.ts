import {
  createItems,
  readItem,
  readItems
} from "@directus/sdk";
import { formatDateBangkok } from "@repo/shared/utils";
import { createFactory } from "hono/factory";
import { logger } from "hono/logger";
import * as _ from "lodash";
import { Env } from "~/types/hono.types";
import { randomNumber } from "~/utils/random";

const factory = createFactory<Env>();

export const getTestKitReqDetail = factory.createHandlers(logger(), async (c) => {
  try {
    const directus = c.get("directAdmin");
    const { id } = c.req.param();

    // const item = await fetchItemDetails(directus, id);
    const item = await directus.request(readItem("test_kit_request", id, {
      fields: [
        "*",
        { "risk_assessment_id": ["*"] },
        { "uid": ["*"] },
      ],
    }));

    if (!item) {
      return c.json(
        {
          success: false,
          message: "Test kit request not found",
        },
        404
      );
    }

    // if (item.request_date && item.testKitReq_date) {
    //   item.duration = calculateDuration(item.request_date, item.testKitReq_date);
    // } else {
    //   item.duration = null;
    // }

    return c.json(item);
  } catch (error) {
    console.error("Error fetching test kit request detail:", error);
    return c.json(
      {
        success: false,
        message: "Failed to fetch test kit request detail",
      },
      500
    );
  }
});


export const postInsertTestKitReq = factory.createHandlers(logger(), async (c) => {
  try {
    const directus = c.get("directAdmin");
    const body = await c.req.json();
    let id = "";
    let isIdDuplicate = true;

    while (isIdDuplicate) {
      id = "J" + randomNumber(8);
      const existing = await directus.request(readItems("test_kit_request", {
        filter: { id: { _eq: id } },
        limit: 1
      }));
      isIdDuplicate = existing.length > 0;
    }
    body["id"] = id;
    const dateTime = formatDateBangkok();
    body["request_date"] = dateTime;

    const result = await directus.request(createItems("test_kit_request", body));

    // Create test_result after creating test_kit_request
    // let testResultId = "";
    // let isTestResultIdDuplicate = true;

    // while (isTestResultIdDuplicate) {
    //     testResultId = "R" + randomNumber(8);
    //     const existing = await directus.request(readItems("test_result", {
    //         filter: { id: { _eq: testResultId } },
    //         limit: 1
    //     }));
    //     isTestResultIdDuplicate = existing.length > 0;
    // }
    // await directus.request(createItems("test_result", {
    //   id: testResultId,
    //   test_kit_request_id: body.id,
    //   uid: body.uid,
    //   result_date: dateTime,
    //   status: "Draft",
    // }));

    return c.json(result);
  } catch (error) {
    console.error("Error inserting testKitReq:", error);
    
    return c.json(
      {
        success: false,
        message: "Failed to insert",
      },
      500 // Internal Server Error status code
    );
  }
});

export const getLatestTestKitReq = factory.createHandlers(logger(), async (c) => {
  const directus = c.get("directAdmin");
  const { id } = c.get("jwtPayload");

  // const { uid } = c.req.query();
  const items = await directus.request(readItems("test_kit_request", {
    fields: ["id","uid","risk_assessment_id","status","request_date",],
    filter: {
      uid: {
        _eq: id
      }
    },
    sort: ["-request_date"],
    limit: 1
  }));
  return c.json(items[0]);
});

export const getTestKitReqByUid = factory.createHandlers(logger(), async (c) => {
  const directus = c.get("directAdmin");
  const { id } = c.get("jwtPayload");

  // const { uid } = c.req.query();
  const items = await directus.request(readItems("test_kit_request", {
    fields: ["*", {
      risk_assessment_id: ["last_test_high_risk", "last_result_test_hiv", "last_test_hiv"],
    }],
    filter: {

      uid: {
        _eq: id
      }
    },
    sort: ["-request_date"],
  }));
  return c.json(
    items.map((item) => {
      const { last_test_high_risk, last_result_test_hiv, last_test_hiv } =
        item.risk_assessment_id || {};
      return {
        ..._.omit(item, ["risk_assessment_id"]),
        last_test_high_risk,
        last_result_test_hiv,
        last_test_hiv,
      };
    })
  );
});