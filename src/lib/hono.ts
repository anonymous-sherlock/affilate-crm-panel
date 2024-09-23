import { hc as hcClient } from "hono/client";
import { AppType } from "../server";

const hc = hcClient<AppType>("http://localhost:8787/");
