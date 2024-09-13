import { Bindings } from "@/types";
import { Hono } from "hono";

const leads = new Hono<{ Bindings: Bindings }>().get("/", async (c) => {
  const xata = c.xata;
  const results = await xata.db.users.create({
    firstname: "akasj",
    lastname: "asdasd",
  });
  return c.json({
    results,
  });
});

export default leads;
