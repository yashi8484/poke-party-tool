import { gql } from "npm:urql@latest";
import { getGqlClient } from "../gql.ts";

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

export const listPokeNatures = async () => {
  const client = getGqlClient();
  const result = await client.query(LIST_POKE_NATURES_QUERY, {
    languageName: DEFAULT_LANGUAGE_NAME,
  });

  return result.data;
};
