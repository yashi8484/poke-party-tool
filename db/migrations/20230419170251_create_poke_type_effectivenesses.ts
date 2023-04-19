import {
  AbstractMigration,
  Info,
  ClientPostgreSQL,
} from "https://deno.land/x/nessie@2.0.10/mod.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(info: Info): Promise<void> {
    await this.client.queryArray(`
          CREATE TABLE IF NOT EXISTS public.poke_type_effectivenesses (
            id serial primary key,
            attacker_type_id smallint NOT NULL,
            defender_type_id smallint NOT NULL,
            effectiveness smallint NOT NULL,
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
          );
        `);
  }

  /** Runs on rollback */
  async down(info: Info): Promise<void> {
    await this.client.queryArray(
      `DROP TABLE IF EXISTS public.poke_type_effectivenesses;`
    );
  }
}
