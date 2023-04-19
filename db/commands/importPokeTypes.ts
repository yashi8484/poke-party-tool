import { ActionHandler } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
import { listPokeTypes } from "../utils/gql/pokeType.ts";
import { insertPokeTypes } from "../utils/sql/pokeType.ts";

export const importPokeTypes: ActionHandler = async (options, ...args) => {
  const pokeTypes = await listPokeTypes();
  await insertPokeTypes(pokeTypes);
};
