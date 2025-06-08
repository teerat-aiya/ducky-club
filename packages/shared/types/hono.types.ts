export type Env = {
  Bindings: Bindings;
  Variables: Variables;
};

type Variables = {
  token: string;
};

type Bindings = {
  NODE_ENV: string
  LAMBDA_SECRET_KEY: string
  DIRECTUS_URL: string
  DIRECTUS_SECRET_KEY: string
  DIRECTUS_SERVICE_TOKEN: string
  PORTAL_URL: string
  FB_API_URL: string;
  FB_APP_ID: string
  FB_APP_SECRET: string
}

