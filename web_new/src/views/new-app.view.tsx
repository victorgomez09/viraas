import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router";
import { Loading } from "../components";

import { AppInputGraphql, useCreateAppMutation } from "../graphql";

export interface AppInput {
  name: string;
  image: string;
  targetPorts?: [{ port: number }];
  publishedPorts?: [{ port: number }];
  volumes?: string[];
  hidden?: boolean;
}

export function NewApp() {
  const navigate = useNavigate();
  const { mutate, error, isError, isSuccess, isLoading } =
    useCreateAppMutation();
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<AppInput>({ mode: "onTouched" });

  const {
    fields: targetPorts,
    append: appendTargetPort,
    remove,
  } = useFieldArray({
    name: "targetPorts",
    control,
  });

  const onSubmit: SubmitHandler<AppInput> = (data) => {
    const app: AppInputGraphql = {
      name: data.name,
      image: data.image,
      publishedPorts: getValues("publishedPorts")?.map(
        (publishedPort) => publishedPort.port
      ),
    };
    mutate({ app });
  };

  if (isLoading) return <Loading />;
  if (isSuccess) navigate("/apps");

  return (
    <div className="card bg-base-200 shadow-md m-4 p-2">
      {isError && (
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
            <span>
              Error:{" "}
              {JSON.stringify(error).includes("repository does not exist")
                ? "Cant't pull image. Maybe it doesn't exist in docker registry"
                : "something goes wrong"}
            </span>
          </div>
        </div>
      )}

      <div className="card-body">
        <h2 className="card-title justify-center mb-4">
          Deploy new application
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col w-full lg:flex-row">
            <div className="grid flex-grow rounded-box place-items-center">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Application name</span>
                </label>
                <input
                  type="text"
                  placeholder="Application 1"
                  className={`input input-bordered w-full max-w-xs ${
                    errors.name ? "input-error" : "input-primary"
                  }`}
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Application name is required",
                    },
                  })}
                />
                {errors.name && (
                  <label className="label">
                    <span className="label-text-alt text-error italic">
                      {errors.name.message}
                    </span>
                  </label>
                )}
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Docker image</span>
                </label>
                <input
                  type="text"
                  placeholder="nginx"
                  className={`input input-bordered w-full max-w-xs ${
                    errors.image ? "input-error" : "input-primary"
                  }`}
                  {...register("image", {
                    required: {
                      value: true,
                      message: "Docker image name is required",
                    },
                  })}
                />
                {!errors.image && (
                  <label className="label">
                    <span className="label-text-alt">
                      Default image version is{" "}
                      <span className="italic">latest</span>
                    </span>
                  </label>
                )}
                {errors.image && (
                  <label className="label">
                    <span className="label-text-alt text-error italic">
                      {errors.image.message}
                    </span>
                  </label>
                )}
              </div>
            </div>

            <div className="divider lg:divider-horizontal" />

            <div className="grid flex-grow card rounded-box place-items-center">
              {targetPorts.map((field, index) => {
                return (
                  <div className="form-control w-full max-w-xs" key={field.id}>
                    <label className="label">
                      <span className="label-text">Published ports</span>
                    </label>
                    <input
                      type="text"
                      placeholder="8080"
                      defaultValue={8080}
                      className={`input input-bordered w-full max-w-xs ${
                        errors.publishedPorts?.[index]
                          ? "input-error"
                          : "input-primary"
                      }`}
                      {...register(
                        `publishedPorts.${index}.port` as "publishedPorts.0.port",
                        { valueAsNumber: true }
                      )}
                    />
                    {errors.publishedPorts?.[index] && (
                      <label className="label">
                        <span className="label-text-alt text-error italic">
                          {errors.publishedPorts?.[index]?.message}
                        </span>
                      </label>
                    )}
                  </div>
                );
              })}
              <span
                className="btn btn-primary btn-xs"
                onClick={() => appendTargetPort({ port: 8080 })}
              >
                Add published port
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="btn btn-primary mt-4 w-72" type="submit">
              Deploy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
