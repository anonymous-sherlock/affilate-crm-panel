import { Bindings } from "@/types";
import { XataClient } from "@/xata";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import leads from "./lead";

let instance: XataClient | undefined = undefined;
const initializeXataDb = (env: Bindings) => {
  if (instance) return instance;

  instance = new XataClient({
    apiKey: env.XATA_API_KEY,
    branch: env.XATA_BRANCH,
    databaseURL: env.XATA_DATABASE_URL,
  });
  return instance;
};

const app = new Hono<{ Bindings: Bindings }>().basePath("/api");

app.use("/*", cors());
app.use("/*", async (ctx, next) => {
  ctx.xata = initializeXataDb(ctx.env);
  await next();
});
const route = app.route("/leads", leads);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof route;
export default app as never;
