import { ActionHandler } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
import { listPokeTypes } from "../utils/gql/pokeType.ts";

export const importPokeTypes: ActionHandler = async (options, ...args) => {
  const pokeNatures = await listPokeTypes();
  console.dir({ pokeNatures }, { depth: 10 });
  // await insertPokeNatures(pokeNatures);
};
