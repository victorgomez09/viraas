import { useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../components";
import { useNodesQuery, useHealthQuery } from "../graphql";

export function Nodes() {
  const [displayOption, setDisplayOption] = useState<"TABLE" | "GRID">("GRID");
  const { data, isLoading, isError } = useNodesQuery();
  const {
    data: healthData,
    isLoading: isHealthLoading,
    isError: isHealthError,
  } = useHealthQuery();

  if (isLoading || isHealthLoading) return <Loading />;

  if (isError)
    return (
      <div className="alert alert-warning shadow-lg">
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
          <span>Warning: This node is not a swarm manager!</span>
        </div>
        <div className="flex-none">
          <button className="btn btn-sm">See</button>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col flex-1 p-2">
      <div className="flex items-center w-full mb-4">
        <div className="form-control w-52">
          <label className="cursor-pointer label">
            <span className="label-text">{displayOption}</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              defaultChecked={displayOption === "TABLE"}
              onChange={(e) =>
                setDisplayOption(e.target.checked ? "GRID" : "TABLE")
              }
            />
          </label>
        </div>
        <div className="flex justify-end w-full">
          <label className="btn btn-sm btn-primary" htmlFor="addNodeModal">
            Add node
          </label>
        </div>
      </div>

      {/* Nodes grid */}
      {displayOption === "GRID" && (
        <div className="grid grid-flow-col auto-cols-max gap-4">
          {data?.nodes.map((node, index) => {
            return (
              <div className="card w-72 bg-base-100 shadow-xl" key={index}>
                <div className="card-body">
                  <h2 className="card-title">{node.hostname}</h2>
                  <div className="flex justify-between items-center">
                    <span>{node.services.length} apps </span>
                    <div
                      className={`badge gap-2 ${
                        node.status.toUpperCase() === "READY"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {node.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-2">
                    <Link
                      to={`/nodes/${node.id}`}
                      className="btn btn-sm btn-primary"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Nodes table */}
      {displayOption === "TABLE" && (
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Ip</th>
                <th>Apps</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.nodes.map((node, index) => {
                return (
                  <tr key={index}>
                    <td>{node.hostname}</td>
                    <td>{node.ip}</td>
                    <td>{node.services.length}</td>
                    <td>
                      {" "}
                      <div
                        className={`badge gap-2 ${
                          node.status.toUpperCase() === "READY"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {node.status.toUpperCase()}
                      </div>
                    </td>
                    <th>
                      <Link
                        to={`/nodes/${node.id}`}
                        className="btn btn-ghost btn-xs"
                      >
                        Details
                      </Link>
                    </th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add node modal */}
      <input type="checkbox" id="addNodeModal" className="modal-toggle" />
      <label htmlFor="addNodeModal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <label
            htmlFor="addNodeModal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="font-bold text-lg">Add node to Swarm!</h3>
          <div className="mt-4 mockup-code">
            <pre data-prefix="#">
              <code>Install Docker</code>
            </pre>
            <pre data-prefix="$">
              <code>curl -fsSL https://get.docker.com -o get-docker.sh</code>
            </pre>
            <pre data-prefix="$">
              <code>sh get-docker.sh</code>
            </pre>

            <pre data-prefix="#">
              <code>Join the cluster</code>
            </pre>
            <pre data-prefix="$">
              <code>docker join {healthData?.health.cluster?.joinCommand}</code>
            </pre>
          </div>
        </label>
      </label>
    </div>
  );
}
