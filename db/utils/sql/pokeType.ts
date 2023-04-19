import type { PokeType } from "../gql/pokeType.ts";
import { connectPostgres, getTruncateQuery } from "../sql.ts";

export const insertPokeTypes = async (
  pokeTypes: PokeType[],
  truncateData = true
) => {
  const client = await connectPostgres();

  const typeValues = pokeTypes
    .map((pokeType) => `(${pokeType.typeId}, '${pokeType.name}')`)
    .join(",");

  const effectivenessValues = pokeTypes
    .map((pokeType) =>
      [
        ...pokeType.attackerEffectivenesses.map(
          (attackerEffectiveness) =>
            `(${pokeType.typeId}, ${attackerEffectiveness.targetTypeId}, ${attackerEffectiveness.effectiveness})`
        ),
        ...pokeType.defenderEffectivenesses.map(
          (defenderEffectiveness) =>
            `(${defenderEffectiveness.damageTypeId}, ${pokeType.typeId}, ${defenderEffectiveness.effectiveness})`
        ),
      ].join(",")
    )
    .join(",");

  if (truncateData) {
    client.queryArray(getTruncateQuery("public.poke_types"));
    client.queryArray(getTruncateQuery("public.poke_type_effectivenesses"));
  }
  client.queryArray(
    `INSERT INTO public.poke_types (type_id, name) VALUES ${typeValues};`
  );
  client.queryArray(
    `INSERT INTO public.poke_type_effectivenesses (attacker_type_id, defender_type_id, effectiveness) VALUES ${effectivenessValues};`
  );

  // おそらく client 変数がスコープ外となったことがきっかけで、暗黙的に client.end() が呼び出される？模様。
  // これにより client.end() が二重で呼び出されエラーとなってしまうため、endPostgres() を呼び出さないようにする。
  // await endPostgres();
};