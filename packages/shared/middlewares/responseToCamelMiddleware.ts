import { Context, Next } from 'hono'
import { camelCase } from 'change-case'

type Obj = { [key: string]: any }

function toCamelKeys(obj: Obj): Obj {
  if (Array.isArray(obj)) {
    return obj.map(v => toCamelKeys(v))
  } else if (obj != null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: toCamelKeys(obj[key]),
      }),
      {},
    )
  }
  return obj
}

export const responseToCamelMiddleware = async (c: Context, next: Next) => {
  await next()
  const response = c.res
  const contentType = response.headers.get('Content-Type')
  if (contentType && contentType.includes('application/json')) {
    const json = await response.json()
    const camelCasedJson = toCamelKeys(json)
    c.res = new Response(JSON.stringify(camelCasedJson), {
      status: response.status,
      headers: response.headers,
    })
  }
}