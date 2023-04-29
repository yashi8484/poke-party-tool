import { ActionHandler } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
import { listPokeItems } from "../utils/scrap/pokeItem.ts";
import { insertPokeItems } from "../utils/sql/pokeItem.ts";

export const handleImportPokeItems: ActionHandler = async (
  options,
  ...args
) => {
  await importPokeItems();
};

export const importPokeItems = async (): Promise<void> => {
  const pokeItems = await listPokeItems();
  await insertPokeItems(pokeItems);
};
