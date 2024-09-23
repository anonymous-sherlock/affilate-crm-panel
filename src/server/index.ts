import { Bindings } from "@/types";
import { XataClient } from "@/xata";
import { drizzle, XataHttpDatabase } from "drizzle-orm/xata-http";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import { drizzle as libSqlDrizzle, LibSQLDatabase } from "drizzle-orm/libsql";
import * as tursoSchema from "@/db/turso/schema/index";
import leads from "./routers/lead";
import { createClient } from "@libsql/client";

let xataInstance: XataClient | undefined = undefined;
let pgInstance: XataHttpDatabase<Record<string, never>> | undefined = undefined;
let tursoInstance: LibSQLDatabase<typeof tursoSchema> | undefined = undefined;

const getDatabaseClients = (env: Bindings) => {
  if (xataInstance && pgInstance && tursoInstance) {
    return { xata: xataInstance, pg: pgInstance, turso: tursoInstance };
  }
  console.log("first time");
  // Initialize XataClient
  xataInstance = new XataClient({
    apiKey: env.XATA_API_KEY,
    branch: env.XATA_BRANCH,
    databaseURL: env.XATA_DATABASE_URL,
  });

  pgInstance = drizzle(xataInstance);

  const libSqlClient = createClient({
    url: env.TURSO_DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  });

  tursoInstance = libSqlDrizzle(libSqlClient);
  // Return the initialized instances
  return {
    xata: xataInstance,
    pg: pgInstance,
    turso: tursoInstance,
  };
};

const app = new Hono<{ Bindings: Bindings }>()
  .basePath("/api/v1")
  .use(cors())
  .use(async (ctx, next) => {
    const envVariables = env(ctx);
    const { xata, pg, turso } = getDatabaseClients(envVariables);
    ctx.xata = xata;
    ctx.pg = pg;
    ctx.turso = turso;

    await next();
  });

/**
 * This is the primary router for your server.
 *
 * All routers added in /server/routers should be manually added here.
 */
const route = app.route("/leads", leads);

// The handler Next.js uses to answer API requests
export const httpHandler = handle(app);

/**
 * (Optional)
 * Exporting our API here for easy deployment
 *
 * Run `npm run deploy` for one-click API deployment to Cloudflare's edge network
 */
export default app;

// export type definition of API
export type AppType = typeof route;
