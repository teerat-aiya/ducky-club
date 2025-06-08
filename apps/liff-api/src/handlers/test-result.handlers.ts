import { createItem, readItem, readItems, updateItem } from "@directus/sdk";
import { formatDateBangkok } from "@repo/shared/utils";
import { createFactory } from "hono/factory";
import { logger } from "hono/logger";
import * as _ from "lodash";
import { Env } from "~/types/hono.types";
import { randomNumber } from "~/utils/random";

const factory = createFactory<Env>();

export const getTestResultDetail = factory.createHandlers(
  logger(),
  async (c) => {
    const directus = c.get("directAdmin");
    const { id } = c.req.param();

    const item = await directus.request(
      readItem("test_result", id, {
        fields: [
          "id",
          "uid",
          "test_kit_request_id",
          "user_result",
          "admin_result",
          "description",
          "status",
          "result_date",
          "image",
        ],
      })
    );
    const medRecordsRaw = await directus.request(
      readItems("med_record", {
        fields: [
          "id",
          "med_type",
          "description",
          "custom_hospital_name",
          { hospital_id: ["name"] },
          "service_date",
          "status",
          "blood_test_result",
        ],
        filter: {
          test_result_id: { _eq: id },
        },
        sort: ["-date_created"],
      })
    );

    const medRecords = medRecordsRaw.map((record) => {
      const { hospital_id, ...rest } = record;

      return {
        ...rest,
        hospital_name:
          hospital_id?.name ||
          record.custom_hospital_name ||
          "ไม่ประสงค์ให้ข้อมูล",
      };
    });

    const STATUS_ORDER: Record<string, number> = {
      "To Do": 1, // รอดำเนินการ
      "In Progress": 2, // กำลังดำเนินการ
      Success: 3, // เข้ารับบริการแล้ว
      Cancel: 4, // ยกเลิกแล้ว
      Unknown: 5, // ไม่ทราบสถานะ
    };

    // 4. เรียงลำดับ array ตาม STATUS_ORDER
    medRecords.sort((a, b) => {
      const rawStatusA = a.status || "Unknown";
      const rawStatusB = b.status || "Unknown";
      const orderA = STATUS_ORDER[rawStatusA];
      const orderB = STATUS_ORDER[rawStatusB];

      return orderA - orderB;

      // ถ้าสถานะเท่ากัน ก็เรียง date_created (ใหม่สุดก่อน)
      // const dateA = new Date(a.date_created);
      // const dateB = new Date(b.date_created);
      // return dateB - dateA;
    });

    return c.json({
      ...item,
      med_records: medRecords.length > 0 ? medRecords : null,
    });

    // return c.json({
    //   ..._.omit(item, ["test_kit_request_id"]),
    //   med_records: medRecords.length > 0 ? medRecords : null,
    // });
  }
);

export const getByTestKitRequestId = factory.createHandlers(
  logger(),
  async (c) => {
    const directus = c.get("directAdmin");
    const { id } = c.req.param();

    const items = await directus.request(
      readItems("test_result", {
        fields: ["id", "uid", "test_kit_request_id", "status"],
        filter: {
          test_kit_request_id: { _eq: id },
        },
        limit: 1,
      })
    );

    if (items.length === 0) {
      return c.json({ message: "Not found" }, 404);
    }

    return c.json(items[0]);
  }
);

export const patchUpdateTestResult = factory.createHandlers(
  logger(),
  async (c) => {
    const directus = c.get("directAdmin");
    const body = await c.req.json();
    const result_date = formatDateBangkok();
    // const image_url = await generateSignedUrl(
    //   body.image,
    //   c.env.DIRECTUS_URL,
    //   c.env.DIRECTUS_SIGNED_URL_SECRET,
    //   60 * 60 * 24 * 7 // 7 days
    // );

    const updatedItem = await directus.request(
      updateItem("test_result", body.id, { ...body, result_date })
    );

    //หลังจากอัพเดตผลการทดสอบแล้ว ให้เปลี่ยนสถานะของ notification เป็น "Cancelled" เพื่อไม่ให้ส่งการติดตามผลอีก
    directus.request(
      updateMany(
        "notification",
        {
          status: "Cancelled",
        },
        {
          filter: { reference_id: { _eq: body.test_kit_request_id } },
        }
      )
    );

    return c.json(updatedItem);
  }
);

export const postInsertTestResult = factory.createHandlers(
  logger(),
  async (c) => {
    const directus = c.get("directAdmin");
    const body = await c.req.json();
    const dateTime = formatDateBangkok();
    const { id: uid } = c.get("jwtPayload");

    let testResultId = "";
    let isDuplicate = true;

    while (isDuplicate) {
      testResultId = "R" + randomNumber(8);
      const existing = await directus.request(
        readItems("test_result", {
          filter: { id: { _eq: testResultId } },
          limit: 1,
        })
      );
      isDuplicate = existing.length > 0;
    }

    body["result_date"] = dateTime;
    body["id"] = testResultId;
    body["uid"] = uid;

    const item = await directus.request(createItem("test_result", body));
    return c.json(item);
  }
);

export const getTestResultByUid = factory.createHandlers(
  logger(),
  async (c) => {
    const directus = c.get("directAdmin");
    const { id } = c.get("jwtPayload");

    const items = await directus.request(
      readItems("test_result", {
        filter: {
          uid: { _eq: id },
          status: { _neq: "Draft" },
          result_date: { _nnull: true },
        },
        sort: ["-result_date"],
      })
    );

    return c.json(items);
  }
);

export const getLatestTestResult = factory.createHandlers(
  logger(),
  async (c) => {
    const directus = c.get("directAdmin");
    const { id } = c.get("jwtPayload");

    const item = await directus.request(
      readItems("test_result", {
        fields: [
          "id",
          "uid",
          "test_kit_request_id",
          "user_result",
          "admin_result",
          "description",
          "status",
          "result_date",
          "image",
        ],
        filter: {
          uid: { _eq: id },
          // result_date: { _nnull: true },
        },
        sort: ["-date_created"],
        limit: 1,
      })
    );

    if (item.length === 0) {
      return c.json({ message: "Not found" }, 404);
    }

    const medRecordsRaw = await directus.request(
      readItems("med_record", {
        fields: [
          "id",
          "med_type",
          "description",
          "custom_hospital_name",
          { hospital_id: ["name"] },
          "service_date",
          "status",
          "blood_test_result",
        ],
        filter: {
          test_result_id: { _eq: item[0].id },
        },
        sort: ["-date_created"],
      })
    );

    const medRecords = medRecordsRaw.map((record) => {
      const { hospital_id, ...rest } = record;

      return {
        ...rest,
        hospital_name:
          hospital_id?.name ||
          record.custom_hospital_name ||
          "ไม่ประสงค์ให้ข้อมูล",
      };
    });

    const STATUS_ORDER: Record<string, number> = {
      "To Do": 1,
      "In Progress": 2,
      Success: 3,
      Cancel: 4,
      Unknown: 5,
    };

    medRecords.sort((a, b) => {
      const rawStatusA = a.status || "Unknown";
      const rawStatusB = b.status || "Unknown";
      const orderA = STATUS_ORDER[rawStatusA];
      const orderB = STATUS_ORDER[rawStatusB];

      return orderA - orderB;
    });

    return c.json({
      ...item[0],
      med_records: medRecords.length > 0 ? medRecords : null,
    });
  }
);
function updateMany(
  arg0: string,
  arg1: { status: string },
  arg2: { filter: { reference_id: { _eq: any } } }
): import("@directus/sdk").RestCommand<
  unknown,
  import("../types/directus").Schema
> {
  throw new Error("Function not implemented.");
}
