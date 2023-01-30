import { RuntimeStatus } from "../graphql";

interface AppStatus {
  statusColor: string;
  statusValue: string;
}

export const checkAppStatus = (status: RuntimeStatus, instancesRunning: number): AppStatus => {
  if (status === "STOPPED")
    return { statusColor: "yellow", statusValue: "stopped" };
  if (status === "RUNNING" && instancesRunning === 0)
    return { statusColor: "red", statusValue: "failed" };
  else
    return { statusColor: "green", statusValue: "running" };
}