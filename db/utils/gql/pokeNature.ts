import { gql } from "npm:urql@latest";
import { getGqlClient } from "../gql.ts";
import type { Pokemon_V2_Nature } from "../../generated/pokeapi.ts";

const DEFAULT_LANGUAGE_NAME = "ja-Hrkt";

const LIST_POKE_NATURES_QUERY = gql`
  query listPokeNaturesQuery($languageName: String!) {
    pokemon_v2_nature {
      pokemon_v2_naturenames(
        where: { pokemon_v2_language: { name: { _eq: $languageName } } }
      ) {
        name
      }
    }
  }
`;

type ListPokeNaturesData = {
  pokemon_v2_nature: Pick<Pokemon_V2_Nature, "pokemon_v2_naturenames">[];
};

export type PokeNature = {
  name: string;
};

const convertPokeNatures = (
  data: ListPokeNaturesData | undefined
): PokeNature[] =>
  data
    ? data.pokemon_v2_nature.map((queryNature) => ({
        name: queryNature.pokemon_v2_naturenames[0].name,
      }))
    : [];

export const listPokeNatures = async () => {
  const client = getGqlClient();
  const result = await client.query<ListPokeNaturesData>(
    LIST_POKE_NATURES_QUERY,
    {
      languageName: DEFAULT_LANGUAGE_NAME,
    }
  );

  return convertPokeNatures(result.data);
};
