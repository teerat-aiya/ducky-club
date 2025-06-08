import { Context, Next } from "hono";
import { createMiddleware } from "hono/factory";
import { decode, verify } from "hono/jwt";
import { JWTPayload } from "hono/utils/jwt/types";
import { Env } from "../types";

const BEARER_PREFIX = "Bearer ";

// Define the type for the Directus JWT payload
interface DirectusJwtPayload {
  id: string;
  role: string;
  app_access: boolean;
  admin_access: boolean;
  iss: string;
}

export const authMiddleware = createMiddleware<Env>(async (c, next) => {
  const DEBUG_MODE = c.env.NODE_ENV === "development";
  const authHeader = c.req.header("Authorization");

  // console.log("authMiddleware:authHeader", authHeader);

  if (!authHeader) {
    return c.json({ error: "Authorization header is missing" }, 401);
  }

  if (!authHeader.startsWith(BEARER_PREFIX)) {
    return c.json({ error: "Invalid Authorization header format" }, 401);
  }

  const token = authHeader.slice(BEARER_PREFIX.length);

  if (!token) {
    return c.json({ error: "Token is missing" }, 401);
  }

  const secretKey = c.env.DIRECTUS_SECRET_KEY;

  if (!secretKey) {
    console.error("DIRECTUS_SECRET_KEY is not set");
    return c.json({ error: "Server configuration error" }, 500);
  }

  try {
    const payload = await verify(token, secretKey);
    if (DEBUG_MODE) {
      debugToken(payload);
    }
    console.log(payload);
    
    // Additional checks based on the Directus payload
    if (payload.iss !== "directus") {
      return c.json({ error: "Invalid token issuer" }, 401);
    }

    c.set("jwtPayload", payload);
    c.set("token", token);
    await next();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Token verification failed:", error.message);
    }
    return c.json({ error: "Invalid or expired token" }, 401);
  }
});

// Helper function to get the JWT payload from the context
export function getJwtPayload(c: Context): DirectusJwtPayload | null {
  return c.get("jwtPayload") as DirectusJwtPayload | null;
}

// Helper functions to check user permissions
export function hasAppAccess(c: Context): boolean {
  const payload = getJwtPayload(c);
  return payload ? payload.app_access : false;
}

export function hasAdminAccess(c: Context): boolean {
  const payload = getJwtPayload(c);
  return payload ? payload.admin_access : false;
}

function debugToken(payload: JWTPayload) {
  try {
    const now = Math.floor(Date.now() / 1000);
    console.log("Token Expiration:");
    if (payload.exp) {
      console.log(
        `Expires at: ${new Date(payload.exp * 1000).toLocaleString()}`
      );
      console.log(`Current time: ${new Date(now * 1000).toLocaleString()}`);
      console.log(`Time until expiration: ${payload.exp - now} seconds`);
    } else {
      console.log("No expiration time found in token");
    }
  } catch (error) {
    console.error("Error decoding token:", error);
  }
}
