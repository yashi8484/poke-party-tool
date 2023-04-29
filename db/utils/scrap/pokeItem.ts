import {
  DOMParser,
  NodeList,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import "https://deno.land/x/dotenv/load.ts";

type ListPokeItemsData = NodeList;

const convertPokeItems = (data: ListPokeItemsData | undefined): PokeItem[] =>
  data ? Array.from(data, (node) => ({ name: node.textContent })) : [];

export const listPokeItems = async () => {
  const response = await fetch(Deno.env.get("POKE_SITE_URL")!);
  const html = await response.text();
  const document = new DOMParser().parseFromString(html, "text/html");
  const nodes = document?.querySelectorAll(
    "#hm_1+table a,#hm_2+table a,#hm_3+p+table a"
  );

  return convertPokeItems(nodes);
};
