import { createClient as createLibSQLClient } from "@libsql/client";
import { LibSQLDatabase, drizzle as libSqlDrizzle } from "drizzle-orm/libsql";
import { XataHttpDatabase, drizzle as drizzleXataHttp } from "drizzle-orm/xata-http";

import * as tursoSchema from "@/db/turso/schema/index";
import { env } from "@/env";
import { XataClient } from "@/xata";

// Singleton instances
let xataInstance: XataClient | undefined;
let pgInstance: XataHttpDatabase<Record<string, never>> | undefined;
let tursoInstance: LibSQLDatabase<typeof tursoSchema> | undefined;

// Create Turso client
const getTursoInstance = () => {
  if (!tursoInstance) {
    const libSqlClient = createLibSQLClient({
      url: env.TURSO_DATABASE_URL,
      authToken: env.TURSO_AUTH_TOKEN,
    });
    tursoInstance = libSqlDrizzle(libSqlClient);
  }
  return tursoInstance;
};

// Create Xata client
const getXataInstance = () => {
  if (!xataInstance) {
    xataInstance = new XataClient({
      apiKey: env.XATA_API_KEY,
      branch: env.XATA_BRANCH,
      databaseURL: env.XATA_DATABASE_URL,
    });
  }
  return xataInstance;
};

// Create Xata HTTP Database (Postgres) client
const getPgInstance = () => {
  if (!pgInstance) {
    const xataClient = getXataInstance();
    pgInstance = drizzleXataHttp(xataClient);
  }
  return pgInstance;
};

// Export instances
const turso = getTursoInstance();
const pg = getPgInstance();
const xata = getXataInstance();

export const db = {
  turso,
  pg,
  xata,
};
