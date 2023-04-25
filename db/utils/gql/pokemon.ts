import { gql } from "npm:urql@latest";
import { getGqlClient } from "../gql.ts";
import type { Pokemon_V2_Pokedex } from "/types/generated/pokeapi.ts";
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
          pokemon_v2_pokemons {
            pokemon_v2_pokemontypes {
              pokemon_v2_type {
                id
              }
            }
            pokemon_v2_pokemonabilities {
              pokemon_v2_ability {
                id
                pokemon_v2_abilitynames(
                  where: {
                    pokemon_v2_language: { name: { _eq: $languageName } }
                  }
                ) {
                  name
                }
              }
            }
            pokemon_v2_pokemonmoves {
              pokemon_v2_move {
                id
                type_id
                pokemon_v2_movenames(
                  where: {
                    pokemon_v2_language: { name: { _eq: $languageName } }
                  }
                ) {
                  name
                }
              }
            }
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

const convertPokemons = (data: ListPokemonsData | undefined): Pokemon[] =>
  data
    ? data.pokemon_v2_pokedex[0].pokemon_v2_pokemondexnumbers.map(
        (queryPokedexNum) => ({
          pokedexNumber: queryPokedexNum.pokedex_number,
          speciesId: queryPokedexNum.pokemon_species_id!,
          name: queryPokedexNum.pokemon_v2_pokemonspecy
            ?.pokemon_v2_pokemonspeciesnames[0].name!,
          typeIds:
            queryPokedexNum.pokemon_v2_pokemonspecy!.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes.map(
              (queryType) => queryType.pokemon_v2_type!.id
            ),
          abilities:
            queryPokedexNum.pokemon_v2_pokemonspecy!.pokemon_v2_pokemons[0].pokemon_v2_pokemonabilities.map(
              (queryAbility) => ({
                abilityId: queryAbility.pokemon_v2_ability!.id,
                name: queryAbility.pokemon_v2_ability!
                  .pokemon_v2_abilitynames[0].name,
              })
            ),
          moves:
            queryPokedexNum.pokemon_v2_pokemonspecy!.pokemon_v2_pokemons[0].pokemon_v2_pokemonmoves.map(
              (queryMove) => ({
                moveId: queryMove.pokemon_v2_move!.id,
                name: queryMove.pokemon_v2_move?.pokemon_v2_movenames[0].name!,
                typeId: queryMove.pokemon_v2_move?.type_id!,
              })
            ),
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
