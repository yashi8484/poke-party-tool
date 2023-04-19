import type { PokeNature } from "../gql/pokeNature.ts";
import { connectPostgres, getTruncateQuery } from "../sql.ts";

export const insertPokeNatures = async (
  pokeNatures: PokeNature[],
  truncateData = true
) => {
  const client = await connectPostgres();

  const values = pokeNatures
    .map((pokeNature) => `('${pokeNature.name}')`)
    .join(",");

  if (truncateData) {
    client.queryArray(getTruncateQuery("public.poke_natures"));
  }
  client.queryArray(`INSERT INTO public.poke_natures (name) VALUES ${values};`);

  // おそらく client 変数がスコープ外となったことがきっかけで、暗黙的に client.end() が呼び出される？模様。
  // これにより client.end() が二重で呼び出されエラーとなってしまうため、endPostgres() を呼び出さないようにする。
  // await endPostgres();
};
