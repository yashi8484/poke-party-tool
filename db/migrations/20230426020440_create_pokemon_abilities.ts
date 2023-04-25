import {
  AbstractMigration,
  Info,
  ClientPostgreSQL,
} from "https://deno.land/x/nessie@2.0.10/mod.ts";

export default class extends AbstractMigration<ClientPostgreSQL> {
  /** Runs on migrate */
  async up(info: Info): Promise<void> {
    await this.client.queryArray(`
        CREATE TABLE IF NOT EXISTS public.pokemon_abilities (
          id serial primary key,
          species_id smallint NOT NULL,
          ability_id smallint NOT NULL,
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          UNIQUE (species_id, ability_id)
        );
      `);
  }

  /** Runs on rollback */
  async down(info: Info): Promise<void> {
    await this.client.queryArray(
      `DROP TABLE IF EXISTS public.pokemon_abilities;`
    );
  }
}
