import { ActionHandler } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
import { listPokemons } from "../utils/gql/pokemon.ts";
import { insertPokemons } from "../utils/sql/pokemon.ts";

export const handleImportPokemons: ActionHandler = async (options, ...args) => {
  await importPokemons();
};

export const importPokemons = async (): Promise<void> => {
  const pokemons = await listPokemons();
  await insertPokemons(pokemons);
};
