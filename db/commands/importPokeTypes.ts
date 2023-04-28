import { ActionHandler } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
import { listPokeTypes } from "../utils/gql/pokeType.ts";
import { insertPokeTypes } from "../utils/sql/pokeType.ts";

export const handleImportPokeTypes: ActionHandler = async (
  options,
  ...args
) => {
  await importPokeTypes();
};

export const importPokeTypes = async (): Promise<void> => {
  const pokeTypes = await listPokeTypes();
  await insertPokeTypes(pokeTypes);
};
