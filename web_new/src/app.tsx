import { Navigate, Route, Routes } from "react-router-dom";
import { AppContainer } from "./components";
import { PrivateRoute } from "./router";
import { Apps, CreateApp, Login, Nodes } from "./views";

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<AppContainer />}>
          <Route path="/" element={<Navigate to="/apps" replace />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/apps/create" element={<CreateApp />} />
          <Route path="/plugins" element={<div>Plugins</div>} />
          <Route path="/nodes" element={<Nodes />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
