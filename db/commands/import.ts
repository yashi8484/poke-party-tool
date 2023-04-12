import { ActionHandler } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
import { listPokeNatures } from "../utils/gql/pokeNature.ts";

export const importData: ActionHandler = async (options, ...args) => {
  const r = await listPokeNatures();
  console.log`${JSON.stringify(r)}`;
};
