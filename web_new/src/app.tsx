import { Navigate, Route, Routes } from 'react-router-dom';
import { AppContainer } from './components';
import { PrivateRoute } from './router';
import { Login, Nodes } from './views'

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<AppContainer />}>
          <Route path="/" element={<Navigate to="/" replace />} />
          <Route path="/apps" element={<div>Apps</div>} />
          <Route path="/plugins" element={<div>Plugins</div>} />
          <Route path="/nodes" element={<Nodes />} />
        </Route>
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App
