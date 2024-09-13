import { XataClient } from "@/xata";

declare module "hono" {
  interface Context {
    xata: XataClient;
  }
}

export type Bindings = {
  DATABASE_URL: string;
  XATA_API_KEY: string;
  XATA_BRANCH: string;
  XATA_DATABASE_URL: string;
};
