import { useQuery } from "react-query";
import { request, gql } from "graphql-request";
import { GRAPHQL_API_URL } from "../config/api.config";

export interface Health {
  version: string;
  dockerVersion: string;
  cluster?: {
    id: string;
    joinCommand: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const useHealthQuery = (
  options?: { health: Health }
) => {
  const HEALTH_QUERY = gql`
    query getHealth {
      health {
        version
        dockerVersion
        cluster {
          id
          joinCommand
          createdAt
          updatedAt
        }
      }
    }
`

  return useQuery<{ health: Health }, {}>("getHealth", () => {
    return request(GRAPHQL_API_URL, HEALTH_QUERY)
  });
}
