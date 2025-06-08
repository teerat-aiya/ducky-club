import * as sdk from "@directus/sdk";
import { createFactory } from "hono/factory";
import { stream } from "hono/streaming";
import { Env } from "~/types/hono.types";

const factory = createFactory<Env>();

export const getFile = factory.createHandlers(async (c) => {
  const directus = c.get("directAdmin");
  const { id } = c.req.param();
  const key = (c.req.query("key") as string) || "";

  const anotherReadableStream = await directus.request(
    sdk.readAssetRaw(id, { key })
  );
  return stream(c, async (stream) => {
    await stream.pipe(anotherReadableStream);
  });
});

// getFileDownload
export const getFileDownload = factory.createHandlers(async (c) => {
  const directus = c.get("directAdmin");
  const { id } = c.req.param();
  const key = (c.req.query("key") as string) || "";

  const anotherReadableStream = await directus.request(
    sdk.readAssetRaw(id, { key })
  );
  return stream(c, async (stream) => {
    await stream.pipe(anotherReadableStream);
  });
});

// uploadFile
export const uploadFile = factory.createHandlers(async (c) => {
  const directus = c.get("directAdmin");

  const body = await c.req.parseBody();
  const formData = new FormData();
  formData.append('folder', body.folder);
  formData.append("file", body.file);
  const result = await directus.request(sdk.uploadFiles(formData));
  return c.json(result);
});

// deleteFile
export const deleteFile = factory.createHandlers(async (c) => {
  const directus = c.get("directAdmin");
  const { id } = c.req.param();
  const key = (c.req.query("key") as string) || "";
  await directus.request(sdk.deleteFile(id));
  return c.json({});
});
