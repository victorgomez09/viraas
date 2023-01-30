import { gql, useQuery } from "@apollo/client";
import { App } from "./apps-query.graphql";

const appFragment = gql`
  fragment AppListApp on App {
    id
    name
    image
    status
    targetPorts
    publishedPorts
    env
    volumes {
      target
      source
    }
    instances {
      running
      total
    }
  }
`;

export const useAppDetailsQuery = (id: string) => {
  const APP_DETAILS_QUERY = gql`
    query appDetails($id: ID!) {
      app: getApp(id: $id) {
        ...AppListApp
      }
    }
    ${appFragment}
  `;

  return useQuery<{ app: App }, { id: string }>(APP_DETAILS_QUERY, {
    variables: { id: id },
  });
};
