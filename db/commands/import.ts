import { ActionHandler } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
import { importPokeTypes } from "./importPokeTypes.ts";
import { importPokemons } from "./importPokemons.ts";
import { importPokeNatures } from "./importPokeNatures.ts";
import { importPokeItems } from "./importPokeItems.ts";

export const importData: ActionHandler = async (options, ...args) => {
  console.log("----- import poke types -----");
  await importPokeTypes();
  console.log("----- import poke natures -----");
  await importPokeNatures();
  console.log("----- import poke items -----");
  await importPokeItems();
  console.log("----- import pokemons -----");
  await importPokemons();
};
