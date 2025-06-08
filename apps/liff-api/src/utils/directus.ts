import {
  createDirectus,
  rest,
  authentication,
  staticToken,
  AuthenticationClient,
  DirectusClient as DirectusClientOriginal,
  RestClient,
} from "@directus/sdk";
import { Schema } from "~/types/directus";

export type ClientType = DirectusClientOriginal<Schema> &
  AuthenticationClient<Schema> &
  RestClient<Schema>;

export type AdminClientType = DirectusClientOriginal<Schema> &
  RestClient<Schema>;

class DirectusClient {
  private static instance: ClientType | null = null;
  private static adminInstance: AdminClientType | null = null;

  private constructor() {}

  public static getInstance(directusUrl: string): ClientType {
    if (!DirectusClient.instance) {
      DirectusClient.instance = createDirectus<Schema>(directusUrl)
        .with(rest())
        .with(authentication("json"));
    }
    return DirectusClient.instance;
  }

  public static getAdminInstance(
    directusUrl: string,
    serviceToken: string
  ): AdminClientType {
    if (!DirectusClient.adminInstance) {
      if (!serviceToken) {
        throw new Error(
          "DIRECTUS_SERVICE_TOKEN is not defined in the environment variables"
        );
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
