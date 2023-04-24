type PokeType = {
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

type PokeNature = {
  name: string;
};

type Pokemon = {
  pokedexNumber: number;
  speciesId: number;
  name: string;
};
