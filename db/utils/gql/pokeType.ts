import { gql } from "npm:urql@latest";
import { getGqlClient } from "../gql.ts";
import type { Pokemon_V2_Type } from "../../generated/pokeapi.ts";
import { DEFAULT_LANGUAGE_NAME } from "../constants.ts";

// 余計なタイプが混ざるため、必要なタイプのみ取れるようにするため id 条件を付与
const LIST_POKE_TYPES_QUERY = gql`
  query listPokeTypesQuery($languageName: String!) {
    pokemon_v2_type(where: { id: { _lte: 18 } }) {
      id
      pokemon_v2_typenames(
        where: { pokemon_v2_language: { name: { _eq: $languageName } } }
      ) {
        name
      }
      pokemon_v2_typeefficacies {
        damage_factor
        target_type_id
      }
      pokemonV2TypeefficaciesByTargetTypeId {
        damage_factor
        damage_type_id
      }
    }
  }
`;

type ListPokeTypesData = {
  pokemon_v2_type: Pick<
    Pokemon_V2_Type,
    | "id"
    | "pokemon_v2_typenames"
    | "pokemon_v2_typeefficacies"
    | "pokemonV2TypeefficaciesByTargetTypeId"
  >[];
};

export type PokeType = {
  typeId: Number;
  name: string;
  attackerEffectivenesses: {
    targetTypeId: Number;
    effectiveness: Number;
  }[];
  defenderEffectivenesses: {
    damageTypeId: Number;
    effectiveness: Number;
  }[];
};

const convertPokeTypes = (data: ListPokeTypesData | undefined): PokeType[] =>
  data
    ? data.pokemon_v2_type.map((queryType) => ({
        typeId: queryType.id,
        name: queryType.pokemon_v2_typenames[0].name,
        attackerEffectivenesses: queryType.pokemon_v2_typeefficacies.map(
          (queryEfficacy) => ({
            targetTypeId: queryEfficacy.target_type_id!,
            effectiveness: queryEfficacy.damage_factor,
          })
        ),
        defenderEffectivenesses:
          queryType.pokemonV2TypeefficaciesByTargetTypeId.map(
            (queryEfficacy) => ({
              damageTypeId: queryEfficacy.damage_type_id!,
              effectiveness: queryEfficacy.damage_factor,
            })
          ),
      }))
    : [];

export const listPokeTypes = async () => {
  const client = getGqlClient();
  const result = await client.query<ListPokeTypesData>(LIST_POKE_TYPES_QUERY, {
    languageName: DEFAULT_LANGUAGE_NAME,
  });

  return convertPokeTypes(result.data);
};
