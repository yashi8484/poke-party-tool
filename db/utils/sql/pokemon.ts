import { connectPostgres, getTruncateQuery } from "../sql.ts";

export const insertPokemons = async (
  pokemons: Pokemon[],
  truncateData = true
) => {
  const client = await connectPostgres();

  const pokemonValues = pokemons
    .map(
      (pokemon) =>
        `(${pokemon.pokedexNumber}, ${pokemon.speciesId}, '${pokemon.name}')`
    )
    .join(",");

  const pokemonTypeValues = pokemons
    .map((pokemon) =>
      pokemon.typeIds
        .map((pokemonType) => `(${pokemon.speciesId}, ${pokemonType})`)
        .join(",")
    )
    .join(",");

  const pokeAbilityValues = pokemons
    .map((pokemon) =>
      pokemon.abilities
        .map((ability) => `(${ability.abilityId}, '${ability.name}')`)
        .join(",")
    )
    .join(",");

  const pokemonAbilityValues = pokemons
    .map((pokemon) =>
      pokemon.abilities
        .map((ability) => `(${pokemon.speciesId}, ${ability.abilityId})`)
        .join(",")
    )
    .join(",");

  if (truncateData) {
    client.queryArray(getTruncateQuery("public.pokemons"));
    client.queryArray(getTruncateQuery("public.pokemon_types"));
    client.queryArray(getTruncateQuery("public.pokemon_abilities"));
    client.queryArray(getTruncateQuery("public.poke_abilities"));
  }
  client.queryArray(
    `INSERT INTO public.pokemons (pokedex_number, species_id, name) VALUES ${pokemonValues};`
  );
  client.queryArray(
    `INSERT INTO public.pokemon_types (species_id, type_id) VALUES ${pokemonTypeValues};`
  );
  client.queryArray(
    `INSERT INTO public.poke_abilities (ability_id, name) VALUES ${pokeAbilityValues} ON CONFLICT DO NOTHING;`
  );
  // gql の取得結果に重複データが含まれてしまうため、インサート時の ON CONFLICT で回避する
  client.queryArray(
    `INSERT INTO public.pokemon_abilities (species_id, ability_id) VALUES ${pokemonAbilityValues} ON CONFLICT DO NOTHING;`
  );
  // おそらく client 変数がスコープ外となったことがきっかけで、暗黙的に client.end() が呼び出される？模様。
  // これにより client.end() が二重で呼び出されエラーとなってしまうため、endPostgres() を呼び出さないようにする。
  // await endPostgres();
};
