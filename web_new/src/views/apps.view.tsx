import { useState } from "react";
import { Link } from "react-router-dom";

import { Loading } from "../components";
import { useAppsQuery } from "../graphql";

export function Apps() {
  const [displayOption, setDisplayOption] = useState<"TABLE" | "GRID">("GRID");
  const clusterIpAddress = location.hostname;
  const { data, isLoading, isError } = useAppsQuery({
    showHidden: false,
    clusterIpAddress,
  });

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
    <div className="flex flex-col p-2">
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
          <Link to="/apps/new" className="btn btn-sm btn-primar">
            New application
          </Link>
        </div>
      </div>

      {!data?.apps.length && (
        <span className="w-full">This cluster don't have applications</span>
      )}

      {/* Nodes grid */}
      {displayOption === "GRID" && (
        <div className="grid grid-flow-col auto-cols-max gap-4">
          {data?.apps.map((app, index) => {
            return (
              <div className="card w-72 bg-base-100 shadow-md" key={index}>
                <div className="card-body">
                  <h2 className="card-title">{app.name}</h2>
                  <div className="flex justify-between items-center">
                    <span>
                      {app.instances?.running}/{app.instances?.total} instances
                    </span>
                    <div
                      className={`badge gap-2 ${
                        app.status.toUpperCase() === "RUNNING"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {app.status.toUpperCase()}
                    </div>
                  </div>
                  <div className="card-actions justify-end mt-2">
                    <a
                      className="link truncate"
                      href={app.availableAt[0]}
                      target="_blank"
                    >
                      Link
                    </a>
                    <Link
                      to={`/apps/${app.id}`}
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
                <th>Instances</th>
                <th>Status</th>
                <th>Link</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.apps.map((app, index) => {
                return (
                  <tr key={index}>
                    <td>{app.name}</td>
                    <td>
                      {app.instances?.running}/{app.instances?.total}
                    </td>
                    <td>
                      {" "}
                      <div
                        className={`badge gap-2 ${
                          app.status.toUpperCase() === "RUNNING"
                            ? "badge-success"
                            : "badge-error"
                        }`}
                      >
                        {app.status.toUpperCase()}
                      </div>
                    </td>
                    <td>
                      <a
                        className="link truncate"
                        href={app.availableAt[0]}
                        target="_blank"
                      >
                        {app.availableAt[0]}
                      </a>
                    </td>
                    <th>
                      <Link
                        to={`/apps/${app.id}`}
                        className="btn btn-primary btn-xs"
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
    </div>
  );
}
