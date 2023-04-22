import { ActionHandler } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
import { listPokemons } from "../utils/gql/pokemon.ts";
import { insertPokemons } from "../utils/sql/pokemon.ts";

export const importPokemons: ActionHandler = async (options, ...args) => {
  const pokemons = await listPokemons();
  await insertPokemons(pokemons);
};
