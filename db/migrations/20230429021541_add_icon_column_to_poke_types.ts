import {
  AbstractMigration,
  Info,
  ClientPostgreSQL,
} from "https://deno.land/x/nessie@2.0.10/mod.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(info: Info): Promise<void> {
    await this.client.queryArray(`
      ALTER TABLE IF EXISTS public.poke_types ADD COLUMN
        IF NOT EXISTS icon_file varchar(20) NOT NULL DEFAULT ''
      ;
    `);
  }

  /** Runs on rollback */
  async down(info: Info): Promise<void> {
    await this.client.queryArray(`
      ALTER TABLE IF EXISTS public.poke_types DROP COLUMN
        IF EXISTS icon_file
      ;
    `);
  }
}
