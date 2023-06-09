type TypeId = number;

type PokeType = {
  typeId: TypeId;
  name: string;
  iconFile: string;
  attackerEffectivenesses: {
    targetTypeId: number;
    effectiveness: number;
  }[];
  defenderEffectivenesses: {
    damageTypeId: number;
    effectiveness: number;
  }[];
};

type PokeAbility = {
  abilityId: number;
  name: string;
};

type PokeNature = {
  name: string;
};

type PokeMove = {
  moveId: number;
  name: string;
  typeId: TypeId;
};

type PokeItem = {
  name: string;
};

type Pokemon = {
  pokedexNumber: number;
  speciesId: number;
  name: string;
  typeIds: TypeId[];
  abilities: PokeAbility[];
  moves: PokeMove[];
};
