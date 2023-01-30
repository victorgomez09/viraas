import request, { gql } from "graphql-request";
import { useQuery } from "react-query";
import { GRAPHQL_API_URL } from "../../config";

const appFragment = gql`
  fragment AppListApp on App {
    id
    name
    image
    status
    instances {
      running
      total
    }
  }
`;

interface NodeService {
  id: string;
  name: string;
  status: string;
  image: string;
  instances: {
    running: number;
    total: number;
  };
}

interface Node {
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

export const useNodeDetailsQuery = (id: string) => {
  const NODE_DETAILS_QUERY = gql`
    query nodeDetails($id: ID!) {
      node: getNode(id: $id) {
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

  return useQuery<{ node: Node }>("nodeDetailsQuery", () => {
    return request(GRAPHQL_API_URL, NODE_DETAILS_QUERY, { id: id });
  });
};
