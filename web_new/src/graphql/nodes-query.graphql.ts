import request, { gql } from "graphql-request";
import { useQuery } from "react-query";
import { GRAPHQL_API_URL } from "../config/api.config";

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

interface NodeService {
  id: string;
  name: string;
}

export interface Node {
  id: string;
  os: string;
  architecture: string;
  status: string;
  statusMessage?: string;
  hostname: string;
  labels: Record<string, string>;
  ip: string;
  services: NodeService[];
}

export const useNodesQuery = () => {
  const NODES_QUERY = gql`
    query nodes {
      nodes {
        id
        os
        architecture
        status
        statusMessage
        hostname
        labels
        ip
        services {
          ...AppListApp
        }
      }
    }
    ${appFragment}
  `;

  return useQuery<{ nodes: Node[] }>("nodesQuery", () => {
    return request(GRAPHQL_API_URL, NODES_QUERY);
  });
}
