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

  if (truncateData) {
    client.queryArray(getTruncateQuery("public.pokemons"));
    client.queryArray(getTruncateQuery("public.pokemon_types"));
  }
  client.queryArray(
    `INSERT INTO public.pokemons (pokedex_number, species_id, name) VALUES ${pokemonValues};`
  );
  client.queryArray(
    `INSERT INTO public.pokemon_types (species_id, type_id) VALUES ${pokemonTypeValues};`
  );
  // おそらく client 変数がスコープ外となったことがきっかけで、暗黙的に client.end() が呼び出される？模様。
  // これにより client.end() が二重で呼び出されエラーとなってしまうため、endPostgres() を呼び出さないようにする。
  // await endPostgres();
};
