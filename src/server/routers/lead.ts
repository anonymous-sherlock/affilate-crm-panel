import { user } from "@/db/turso/schema";
import { apiConfigurations } from "@/db/xata/schema";
import { Bindings } from "@/types";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { env } from "hono/adapter";
import { getConnInfo } from "hono/cloudflare-workers";
import { z } from "zod";

const leadSchema = z.object({
   name: z.string({ message: "Name is required" }),
   phone: z.string(),
   s1: z.string(),
   lp_name: z.string(),
   address: z.string().optional(),
});
const leads = new Hono<{ Bindings: Bindings }>()
   .post(
      "/",
      zValidator("json", leadSchema, (result, c) => {
         if (!result.success) {
            const error = result.error.flatten();
            return c.json(error, 400);
         }
      }),
      async (c, next) => {
         try {
            const apiKey = c.req.header("API_KEY");
            const { API_SECRET_TOKEN } = env(c);

            if (!apiKey) {
               return c.json(
                  {
                     error: "Unauthorized",
                     message: "API Key is required",
                  },
                  401,
               );
            }
            if (apiKey !== API_SECRET_TOKEN) {
               return c.json(
                  {
                     error: "Unauthorized",
                     message: "Invalid API Key.",
                  },
                  401,
               );
            }
            const info = getConnInfo(c);

            const data = c.req.valid("json");
            const res = await c.xata.db.leads
               .filter({
                  phone: data.phone,
               })
               .getFirst();

            if (res) {
               return c.json(
                  {
                     success: false,
                     message: "Phone number already exists",
                  },
                  400,
               );
            }

            const newLead = await c.xata.db.leads.create({
               name: data.name,
               phone: data.phone,
               address: data.address,
               lp_name: data.lp_name,
               ip_address: info.remote.address,
            });

            const url = new URL(
               "https://sothsdfweosncrmax.xyz/crm/database-api/pabbly_leads.php",
            );
            const params = {
               name: data.name,
               mobile_no: data.phone,
               s1: data.s1,
               lp_name: data.lp_name,
               address: data.address ?? "",
            };
            Object.entries(params).forEach(([key, value]) =>
               url.searchParams.append(key, value),
            );

            const response = await fetch(url.toString());
            if (!response.ok) {
               console.log("Request failed:", response.statusText);
            }

            const resJson = await response.json();
            console.log(resJson);
            return c.json({
               sucess: true,
               order_id: newLead.id,
            });
         } catch (error) {
            return c.json(
               {
                  success: false,
                  error: "Something Went Wrong",
               },
               400,
            );
         }
      },
   )
   .get("/add", async (c, next) => {
      try {
         const startTime = performance.now();
      
         const info = getConnInfo(c);
         const result = await c.turso.select().from(user);

         console.log(info)
         const endTime = performance.now();
         const duration = endTime - startTime;

         console.log(`Execution time: ${duration.toFixed(2)}ms`);

         return c.json({ order_id: result[0]?.id }, 200);
      } catch (error) {
         console.log(error);
      }
   });

export default leads;
