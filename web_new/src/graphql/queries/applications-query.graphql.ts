import request, { gql } from "graphql-request";
import { useQuery } from "react-query";
import { GRAPHQL_API_URL } from "../../config/api.config";

export type RuntimeStatus = "RUNNING" | "STOPPED";

export interface App {
  id: string;
  name: string;
  group?: string;
  status: RuntimeStatus;
  simpleRoute?: string;
  instances?: {
    running: number;
    total: number;
  };
  availableAt: string[];
}

interface ListAppArgs {
  showHidden: boolean | undefined;
  clusterIpAddress: String;
}

export const appFragment = gql`
  fragment AppListApp on App {
    id
    name
    group
    status
    simpleRoute
    instances {
      running
      total
    }
  }
`;

export function useAppListQuery(args: ListAppArgs) {
  const APPS_QUERY = gql`
    query listApps($showHidden: Boolean, $clusterIpAddress: String!) {
      apps: listApps(showHidden: $showHidden) {
        ...AppListApp
        availableAt(clusterIpAddress: $clusterIpAddress)
      }
    }
    ${appFragment}
  `;

  return useQuery<{ apps: App[] }, {}, ListAppArgs>(
    "listApps",
    () => {
      return request(GRAPHQL_API_URL, APPS_QUERY, args);
    }
    // args
  );
}
