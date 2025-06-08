import { ClientType, AdminClientType } from "~/utils/directus";

export interface AppEnv extends WorkerEnv {}
export interface Env {
  Bindings: AppEnv;
  Variables: {
    token: string;
    directus: ClientType;
    directAdmin: AdminClientType;
  };
}
