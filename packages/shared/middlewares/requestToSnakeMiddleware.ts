import { Context, Next } from 'hono'
import { snakeCase } from 'change-case'

type Obj = { [key: string]: any }

function toSnakeKeys<T extends Obj>(obj: T): { [K in keyof T as string]: T[K] } {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      snakeCase(key),
      value && typeof value === 'object' ? toSnakeKeys(value) : value
    ])
  ) as { [K in keyof T as string]: T[K] }
}

export const requestToSnakeMiddleware = async (c: Context, next: Next) => {
  // Convert query parameters
  const originalQuery = c.req.query.bind(c.req)
  c.req.query = ((key?: string): any => {
    if (key !== undefined) {
      return originalQuery(snakeCase(key))
    }
    return toSnakeKeys(originalQuery() as Record<string, string>)
  }) as typeof c.req.query

  // Convert URL parameters
  const originalParam = c.req.param.bind(c.req)
  c.req.param = ((key?: string): any => {
    if (key !== undefined) {
      return originalParam(snakeCase(key))
    }
    return toSnakeKeys(originalParam())
  }) as typeof c.req.param

  // Convert request body if it's JSON
  const contentType = c.req.header('Content-Type')
  if (contentType && contentType.includes('application/json')) {
    const originalJson = c.req.json.bind(c.req)
    c.req.json = async <T>(): Promise<T> => {
      const body = await originalJson()
      return toSnakeKeys(body) as T
    }
  }

  await next()
}