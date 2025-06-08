import { Context, Next } from "hono";
import { Env } from "~/types/hono.types";


export async function errorHandler(c: Context<Env>, next: Next) {
  try {
    await next();
  } catch (err) {
    console.log("Hello from error handler");
    
    if (err instanceof Error) {
      return c.json({ error: err.message }, 500);
    }
    return c.json({ error: "An unknown error occurred" }, 500);
  }
};