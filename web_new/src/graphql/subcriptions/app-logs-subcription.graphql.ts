import { useSubscription, gql as apolloGQL } from "@apollo/client";
import request, { gql } from "graphql-request";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { GRAPHQL_API_URL } from "../../config";

interface Log {
  message: string;
  timestamp: Date;
}

interface AppLogs {
  logs: Log[];
}

const appLogsFragment = gql`
  fragment AppLogApp on Log {
    message
    timestamp
  }
`;

export const useAppLogsQuery = (id: string) => {
  const APP_LOGS_DETAILS_QUERY = gql`
    subscription appLogs($id: ID!) {
      logs: appLogs(id: $id) {
        logs {
          message
          timestamp
        }
      }
    }
  `;

  return useQuery<{ logs: AppLogs }>("appLogsQuery", () => {
    return request(GRAPHQL_API_URL, APP_LOGS_DETAILS_QUERY, { id: id });
  });
};

export const useAppLogsSubscription = (id: string) => {
  const APP_LOGS_DETAILS_QUERY = apolloGQL`
    subscription appLogs($id: ID!) {
      logs: appLogs(id: $id) {
        logs {
          message
          timestamp
        }
      }
    }
  `;

  return useSubscription(APP_LOGS_DETAILS_QUERY, { variables: { id: id } });
};
