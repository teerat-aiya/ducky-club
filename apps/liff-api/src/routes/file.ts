import { Hono } from "hono";
import { deleteFile, readAssetRaw, uploadFiles } from "@directus/sdk";
import { stream } from "hono/streaming";
import { cache } from "hono/cache";
import { Env } from "~/types/hono.types";
import { randomHexString } from "@repo/shared/utils";
import { directusAdminMiddleware } from "~/middlewares/directus-admin.middleware";
import * as fileHandlers from "../handlers/file.handlers";

const fileRoutes = new Hono<Env>()
  .get(
    "/:id",
    cache({
      cacheName: "my-app",
      cacheControl: "max-age=60",
    }),
    directusAdminMiddleware,
    ...fileHandlers.getFile
  )
  .get(
    "/:id/:file_download",
    cache({
      cacheName: "my-app",
      cacheControl: "max-age=60",
    }),
    directusAdminMiddleware,
    ...fileHandlers.getFileDownload
  )
  .post("/upload", directusAdminMiddleware, ...fileHandlers.uploadFile)
  .delete("/:id", directusAdminMiddleware, ...fileHandlers.deleteFile);

export { fileRoutes };
