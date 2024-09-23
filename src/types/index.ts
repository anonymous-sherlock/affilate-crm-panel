import { XataClient } from "@/xata";
import { LibSQLDatabase } from "drizzle-orm/libsql";
import { XataHttpDatabase } from "drizzle-orm/xata-http";
import * as tursoSchema from "@/db/turso/schema/index";

declare module "hono" {
  interface Context {
    xata: XataClient;
    pg: XataHttpDatabase<Record<string, never>>;
    turso: LibSQLDatabase<typeof tursoSchema>;
  }
}

export type Bindings = {
  DATABASE_URL: string;
  XATA_API_KEY: string;
  XATA_BRANCH: string;
  XATA_DATABASE_URL: string;
  TURSO_DATABASE_URL: string;
  TURSO_AUTH_TOKEN: string;
  API_SECRET_TOKEN: string;
};
