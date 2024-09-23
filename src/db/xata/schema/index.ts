import { sql } from "drizzle-orm";
import { integer, jsonb, pgEnum, pgTable, text, timestamp, unique, uniqueIndex } from "drizzle-orm/pg-core";

export const apiMethod = pgEnum("API_METHOD", ["GET", "POST", "PUT", "DELETE", "PATCH"]);
export const authType = pgEnum("AUTH_TYPE", ["BASIC", "BEARER", "API_KEY_HEADER", "API_KEY_QUERY"]);
export const bodyType = pgEnum("BODY_TYPE", ["JSON", "FORM_DATA", "URL_ENCODED", "TEXT"]);

export const apiConfigurations = pgTable(
  "api_configurations",
  {
    xataVersion: integer("xata_version").default(0).notNull(),
    xataCreatedat: timestamp("xata_createdat", { precision: 6, withTimezone: true, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    xataUpdatedat: timestamp("xata_updatedat", { precision: 6, withTimezone: true, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    xataId: text("xata_id")
      .default(sql`('rec_'::text || (xata_private.xid())::text)`)
      .notNull(),
    apiKey: text("apiKey"),
    authToken: text("authToken"),
    authType: authType("authType").notNull(),
    method: apiMethod("method").notNull(),
    bodyType: bodyType("bodyType").notNull(),
    basicAuth: jsonb("basicAuth"),
    headers: jsonb("headers"),
    url: text("url").notNull(),
    queryParams: jsonb("queryParams"),
    body: text("body"),
  },
  (table) => {
    return {
      pgrollNewApiConfigurationsXataIdKey: uniqueIndex("_pgroll_new_api_configurations_xata_id_key").using("btree", table.xataId.asc().nullsLast()),
    };
  }
);

export const leads = pgTable(
  "leads",
  {
    xataCreatedat: timestamp("xata_createdat", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
    xataUpdatedat: timestamp("xata_updatedat", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
    xataId: text("xata_id")
      .default(sql`('rec_'::text || (xata_private.xid())::text)`)
      .notNull(),
    xataVersion: integer("xata_version").default(0).notNull(),
    address: text("address"),
    city: text("city"),
    country: text("country"),
    ipAddress: text("ip_address"),
    lpName: text("lp_name"),
    name: text("name").notNull(),
    phone: text("phone").notNull(),
    state: text("state"),
    zip: text("zip"),
  },
  (table) => {
    return {
      phoneKey: uniqueIndex("leads_phone_key").using("btree", table.phone.asc().nullsLast()),
      pgrollNewLeadsXataIdKey: unique("_pgroll_new_leads_xata_id_key").on(table.xataId),
    };
  }
);

export const users = pgTable(
  "users",
  {
    email: text("email").notNull(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    clerkId: text("clerk_id").notNull(),
    xataId: text("xata_id")
      .default(sql`('rec_'::text || (xata_private.xid())::text)`)
      .notNull(),
    xataVersion: integer("xata_version").default(0).notNull(),
    xataCreatedat: timestamp("xata_createdat", { precision: 6, withTimezone: true, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    xataUpdatedat: timestamp("xata_updatedat", { precision: 6, withTimezone: true, mode: "string" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => {
    return {
      usersPgrollNewXataIdKey: uniqueIndex("Users__pgroll_new_xata_id_key").using("btree", table.xataId.asc().nullsLast()),
      clerkIdKey: uniqueIndex("users_clerk_id_key").using("btree", table.clerkId.asc().nullsLast()),
      emailKey: uniqueIndex("users_email_key").using("btree", table.email.asc().nullsLast()),
    };
  }
);
