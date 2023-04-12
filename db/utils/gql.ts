import { Client, cacheExchange, fetchExchange } from "npm:urql@latest";

let graphqlClient: Client;

export const getGqlClient = () => {
  if (!graphqlClient) {
    graphqlClient = new Client({
      url: "https://beta.pokeapi.co/graphql/v1beta",
      exchanges: [cacheExchange, fetchExchange],
    });
  }

  return graphqlClient;
};
