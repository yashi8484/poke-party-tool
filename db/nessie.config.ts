import {
  ClientPostgreSQL,
  NessieConfig,
} from "https://deno.land/x/nessie@2.0.10/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

const client = new ClientPostgreSQL({
  database: Deno.env.get("PGDATABASE"),
  hostname: Deno.env.get("PGHOST"),
  port: Deno.env.get("PGPORT"),
  user: Deno.env.get("PGUSER"),
  password: Deno.env.get("PGPASSWORD"),
});

/** This is the final config object */
const config: NessieConfig = {
  client,
  migrationFolders: ["./migrations"],
  seedFolders: ["./seeds"],
};

export default config;
