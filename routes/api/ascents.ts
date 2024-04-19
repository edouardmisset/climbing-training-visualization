import { FreshContext } from "$fresh/server.ts"
import * as Data from "data/all-successes.json" with { type: "json" }

export const handler = (_req: Request, _ctx: FreshContext): Response => {
  const body = JSON.stringify(Data)
  return new Response(body)
}
