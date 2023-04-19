import { Client } from "https://deno.land/x/postgres/mod.ts";
import "https://deno.land/x/dotenv/load.ts";

let postgresClient: Client;

const getPostgresClient = () => {
  if (!postgresClient) {
    postgresClient = new Client({
      database: Deno.env.get("PGDATABASE"),
      hostname: Deno.env.get("PGHOST"),
      port: Deno.env.get("PGPORT"),
      user: Deno.env.get("PGUSER"),
      password: Deno.env.get("PGPASSWORD"),
    });
  }

  return postgresClient;
};

export const connectPostgres = async () => {
  const client = getPostgresClient();
  if (!client.connected) {
    await client.connect();
  }
  return client;
};

export const endPostgres = async () => {
  const client = getPostgresClient();
  await client.end(); // end() 内で connected 判定されるようなので無条件で呼び出す。
};

export const getTruncateQuery = (tableName: string): string =>
  `TRUNCATE ${tableName} RESTART IDENTITY CASCADE;`;
