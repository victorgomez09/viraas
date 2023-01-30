import request, { gql } from "graphql-request";
import { useMutation } from "react-query";
import { App, appFragment } from "..";
import { GRAPHQL_API_URL } from "../../config/api.config";

export interface AppInput {
  name: string;
  image: string;
  targetPorts?: number[];
  publishedPorts?: number[];
  volumes?: string[];
  hidden?: boolean;
}

export function useCreateAppMutation(app: AppInput) {
  const CREATE_APP_MUTATION = gql`
    mutation createApp($app: AppInput!) {
      app: createApp(input: $app) {
        ...AppListApp
      }
    }
    ${appFragment}
  `;

  return useMutation<{ app: App }, {}, { app: AppInput }>(
    () => {
      return request(GRAPHQL_API_URL, CREATE_APP_MUTATION, app);
    }
  );
}
