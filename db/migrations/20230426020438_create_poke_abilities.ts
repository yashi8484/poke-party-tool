import {
  AbstractMigration,
  Info,
  ClientPostgreSQL,
} from "https://deno.land/x/nessie@2.0.10/mod.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(info: Info): Promise<void> {
    await this.client.queryArray(`
        CREATE TABLE IF NOT EXISTS public.poke_abilities (
          id serial primary key,
          ability_id smallint NOT NULL UNIQUE,
          name varchar(20) NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `);
  }

  /** Runs on rollback */
  async down(info: Info): Promise<void> {
    await this.client.queryArray(`DROP TABLE IF EXISTS public.poke_abilities;`);
  }
}
