import { gql } from "npm:urql@latest";
import { getGqlClient } from "../gql.ts";
import type { Pokemon_V2_Pokedex } from "../../generated/pokeapi.ts";
import { DEFAULT_LANGUAGE_NAME, VERSION_GROUP_ID_SV } from "../constants.ts";

const LIST_POKEMONS_QUERY = gql`
  query listPokemonsQuery($languageName: String!, $versionGroupId: Int!) {
    pokemon_v2_pokedex(
      where: {
        pokemon_v2_pokedexversiongroups: {
          version_group_id: { _eq: $versionGroupId }
        }
      }
    ) {
      pokemon_v2_pokemondexnumbers(order_by: { pokedex_number: asc }) {
        pokemon_species_id
        pokedex_number
        pokemon_v2_pokemonspecy {
          pokemon_v2_pokemonspeciesnames(
            where: { pokemon_v2_language: { name: { _eq: $languageName } } }
          ) {
            name
          }
        }
      }
    }
  }
`;

type ListPokemonsData = {
  pokemon_v2_pokedex: Pick<
    Pokemon_V2_Pokedex,
    "pokemon_v2_pokemondexnumbers"
  >[];
};

export type Pokemon = {
  pokedexNumber: number;
  speciesId: number;
  name: string;
};

const convertPokemons = (data: ListPokemonsData | undefined): Pokemon[] =>
  data
    ? data.pokemon_v2_pokedex[0].pokemon_v2_pokemondexnumbers.map(
        (queryPokedexNum) => ({
          pokedexNumber: queryPokedexNum.pokedex_number,
          speciesId: queryPokedexNum.pokemon_species_id!,
          name: queryPokedexNum.pokemon_v2_pokemonspecy
            ?.pokemon_v2_pokemonspeciesnames[0].name!,
        })
      )
    : [];

export const listPokemons = async () => {
  const client = getGqlClient();
  const result = await client.query<ListPokemonsData>(LIST_POKEMONS_QUERY, {
    languageName: DEFAULT_LANGUAGE_NAME,
    versionGroupId: VERSION_GROUP_ID_SV,
  });

  return convertPokemons(result.data);
};