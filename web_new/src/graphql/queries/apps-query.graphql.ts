import request, { gql } from "graphql-request";
import { useQuery } from "react-query";

import { GRAPHQL_API_URL } from "../../config";
import { appFragment } from "./nodes-query.graphql";

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
  showHidden: boolean;
  clusterIpAddress: String;
}

export function useAppsQuery({ showHidden, clusterIpAddress }: ListAppArgs) {
  const APPS_QUERY = gql`
    query listApps($showHidden: Boolean, $clusterIpAddress: String!) {
      apps: listApps(showHidden: $showHidden) {
        ...AppListApp
        availableAt(clusterIpAddress: $clusterIpAddress)
      }
    }
    ${appFragment}
  `;

  return useQuery<{ apps: App[] }>("appsQuery", () => {
    return request(GRAPHQL_API_URL, APPS_QUERY, {
      showHidden,
      clusterIpAddress,
    });
  });
}
