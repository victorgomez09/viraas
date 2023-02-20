import { Outlet } from "react-router-dom";
import { Navbar } from ".";

export function AppContainer() {
  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      {/* <div className="flex flex-1 p-2"> */}
      {/* <div className="p-2"> */}
      <Outlet />
      {/* </div> */}
      {/* </div> */}
    </div>
  );
}
