import { sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const user = sqliteTable(
  "user",
  {
    id: text("id").primaryKey().notNull(),
    firstname: text("firstname").notNull(),
    lastname: text("lastname"),
    clerkId: text("clerkId").notNull(),
  },
  (table) => {
    return {
      clerkIdKey: uniqueIndex("user_clerkId_key").on(table.clerkId),
    };
  }
);
