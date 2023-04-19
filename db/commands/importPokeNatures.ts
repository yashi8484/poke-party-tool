import { ActionHandler } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
import { listPokeNatures } from "../utils/gql/pokeNature.ts";
import { insertPokeNatures } from "../utils/sql/pokeNature.ts";

export const importPokeNatures: ActionHandler = async (options, ...args) => {
  const pokeNatures = await listPokeNatures();
  await insertPokeNatures(pokeNatures);
};
