import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://beta.pokeapi.co/graphql/v1beta",
  generates: {
    "types/generated/pokeapi.ts": {
      plugins: ["typescript"],
    },
  },
};

export default config;
