import { connectPostgres, getTruncateQuery } from "../sql.ts";

export const insertPokeItems = async (
  pokeItems: PokeItem[],
  truncateData = true
) => {
  const client = await connectPostgres();

  const itemValues = pokeItems
    .map((pokeItem) => `('${pokeItem.name}')`)
    .join(",");

  if (truncateData) {
    client.queryArray(getTruncateQuery("public.poke_items"));
  }
  client.queryArray(
    `INSERT INTO public.poke_items (name) VALUES ${itemValues};`
  );

  // おそらく client 変数がスコープ外となったことがきっかけで、暗黙的に client.end() が呼び出される？模様。
  // これにより client.end() が二重で呼び出されエラーとなってしまうため、endPostgres() を呼び出さないようにする。
  // await endPostgres();
};
