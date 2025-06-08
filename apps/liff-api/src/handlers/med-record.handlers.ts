import { readItems } from "@directus/sdk";
import { createFactory } from "hono/factory";
import { logger } from "hono/logger";
import { Env } from "~/types/hono.types";

const factory = createFactory<Env>();

export const getByTestResultId = factory.createHandlers(logger(), async (c) => {
  try {
    const directus = c.get("directAdmin");
    const { test_result_id } = c.req.param();
    const { status } = c.req.query();
    let statusFilter = {};
    if (status) {
      // แปลงเป็น array (ถ้าเป็น string ให้ split ด้วย comma)
      const raw = status;
      const statuses: string[] = Array.isArray(raw)
        ? raw
        : String(raw).split(",").map(s => s.trim());

      // กรองเฉพาะค่า non-empty string
      const filteredStatuses = statuses.filter(s => s.length > 0);
      if (filteredStatuses.length > 0) {
        statusFilter = { status: { _in: filteredStatuses } };
      }
    }

    const filterCondition = {
      test_result_id: { _eq: test_result_id },
      ...statusFilter,
    };

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
        filter: filterCondition,
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

    return c.json(medRecords);
  } catch (error) {
    console.error("Error in getByTestResultId:", error);
    return c.json({ error: "Failed to fetch data" }, 500);
  }
});
