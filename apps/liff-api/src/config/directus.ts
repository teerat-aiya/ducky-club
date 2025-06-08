// config/directus.ts
import {
  createDirectus,
  rest,
  authentication,
  staticToken,
  AuthenticationClient,
  DirectusClient as DirectusClientOriginal,
  RestClient,
} from "@directus/sdk";
import { Schema } from "./schema";

// const directusUrl = process.env.DIRECTUS_URL as string;
// const serviceToken = process.env.DIRECTUS_SERVICE_TOKEN as string;
const directusUrl = "https://console.portal.aiya.ai"
const serviceToken = "f8LiIZVxY2-jGDqgeTU40IZ2xrj-7ygy"

if (!directusUrl) {
  throw new Error("DIRECTUS_URL is not defined in the environment variables");
}

type ClientType = DirectusClientOriginal<Schema> &
  AuthenticationClient<Schema> &
  RestClient<Schema>;

type AdminClientType = DirectusClientOriginal<Schema> & RestClient<Schema>;

class DirectusClient {
  private static instance: ClientType | null = null;
  private static adminInstance: AdminClientType | null = null;

  private constructor() {}

  public static getInstance(): ClientType {
    if (!DirectusClient.instance) {
      DirectusClient.instance = createDirectus<Schema>(directusUrl)
        .with(rest())
        .with(authentication("json"));
    }
    return DirectusClient.instance;
  }

  public static getAdminInstance(): AdminClientType {
    if (!DirectusClient.adminInstance) {
      if (!serviceToken) {
        throw new Error("DIRECTUS_SERVICE_TOKEN is not defined in the environment variables");
      }
      DirectusClient.adminInstance = createDirectus<Schema>(directusUrl)
        .with(rest())
        .with(staticToken(serviceToken));
    }
    return DirectusClient.adminInstance;
  }
}

export const getDirectusClient = DirectusClient.getInstance;
export const getAdminDirectusClient = DirectusClient.getAdminInstance;