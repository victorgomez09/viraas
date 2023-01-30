import { Navigate, Route, Routes } from 'react-router-dom';
import { AppContainer } from './components';
import { PrivateRoute } from './router';
import { Apps, Login, NewApp, NodeDetails, Nodes } from './views'


function App() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<AppContainer />}>
          <Route path="/" element={<Navigate to="/apps" replace />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/apps/new" element={<NewApp />} />
          <Route path="/plugins" element={<div>Plugins</div>} />
          <Route path="/nodes" element={<Nodes />} />
          <Route path="/nodes/:id" element={<NodeDetails />} />
        </Route>
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
