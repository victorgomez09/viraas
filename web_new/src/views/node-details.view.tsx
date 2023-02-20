import { useParams } from "react-router-dom";

import { Loading } from "../components";
import { useNodeDetailsQuery } from "../graphql";

export function NodeDetails() {
  const { id } = useParams();
  const { data, isLoading, isError } = useNodeDetailsQuery(id || "");

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="alert alert-error shadow-lg">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Error: Something goes wrong!</span>
        </div>
      </div>
    );

  return (
    <div className="card bg-base-200 shadow-md m-4">
      <div className="card-body">
        <h2 className="card-title justify-center mb-4">
          {data?.node.hostname}
        </h2>
        <div className="flex flex-col w-full lg:flex-row">
          <div className="grid flex-grow h-32 rounded-box place-items-center">
            <div className="flex justify-between w-full">
              <span className="font-bold">IP</span>
              <span className="italic">{data?.node.ip}</span>
            </div>
            <div className="flex justify-between w-full">
              <span className="font-bold">Operative system</span>
              <span className="italic">{data?.node.os}</span>
            </div>
            <div className="flex justify-between w-full">
              <span className="font-bold">Architecture</span>
              <span className="italic">{data?.node.architecture}</span>
            </div>
          </div>
          <div className="divider lg:divider-horizontal" />
          <div className="grid flex-grow h-32 card rounded-box place-items-center">
            <div className="flex justify-between w-full">
              <span className="font-bold">Status</span>
              <div
                className={`badge gap-2 ${
                  data?.node.status.toUpperCase() === "READY"
                    ? "badge-success"
                    : "badge-error"
                }`}
              >
                {data?.node.status.toUpperCase()}
              </div>
            </div>
            <div className="flex justify-between w-full">
              <span className="font-bold">Applications</span>
              {!data?.node.services.length && (
                <span className="italic">No apps running</span>
              )}
              {data?.node.services.length! > 0 && (
                <div>
                  {data?.node.services.map((app, index) => {
                    return <div key={index}>{app.name}</div>;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
