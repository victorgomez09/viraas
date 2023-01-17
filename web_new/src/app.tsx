import { Navigate, Route, Routes } from 'react-router-dom';
import { AppContainer } from './components';
import { PrivateRoute } from './router';
import { Login } from './views'

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route element={<AppContainer />}>
          <Route path="/" element={<Navigate to="/" replace />} />
          <Route path="/apps" element={<Navigate to="/" replace />} />
        </Route>
      </Route>
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App
