import { createFactory } from "hono/factory";
import { getAdminDirectusClient } from "~/utils/directus";

const factory = createFactory();

export const directusAdminMiddleware = factory.createMiddleware(
  async (c, next) => {
    const { DIRECTUS_URL, DIRECTUS_SERVICE_TOKEN } = c.env;
    const directus = getAdminDirectusClient(
      DIRECTUS_URL,
      DIRECTUS_SERVICE_TOKEN
    );
    c.set("directAdmin", directus);
    await next();
  }
);
