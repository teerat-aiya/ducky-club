import { createFactory } from "hono/factory";
import { getAdminDirectusClient, getDirectusClient } from "~/utils/directus";

const factory = createFactory();

export const directusMiddleware = factory.createMiddleware(async (c, next) => {
  const { DIRECTUS_URL } = c.env;
  const directus = getDirectusClient(DIRECTUS_URL);
  directus.setToken(c.get("token"));
  c.set("directus", directus);
  await next();
});