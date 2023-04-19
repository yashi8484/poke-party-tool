import { Command } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts";
import { importData } from "./commands/import.ts";
import { importPokeTypes } from "./commands/importPokeTypes.ts";

await new Command()
  .name("poketool")
  .version("0.1.0")
  .action((options, ...args) => console.log("Main command called."))
  .command("import", "import data.")
  .action(importPokeTypes)
  .parse(Deno.args);

// db create
// db migration
// db data import
