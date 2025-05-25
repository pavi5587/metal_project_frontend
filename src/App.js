import './App.css';
import { Route, Routes, Navigate } from "react-router-dom";
import Purity from './pages/purity';
import MetalRate from './pages/metalRate';
import Header from './components/header';
import NotFound from "./pages/notFound";
import { ToastContainer } from "react-toastify";
import Login from './pages/Login';
import Register from './pages/register';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? children : <Navigate to="/login" />;
};
function App() {
  return (
    <div>
      <ToastContainer />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/purity"
          element={
            <ProtectedRoute>
              <Purity />
            </ProtectedRoute>
          }
        />
        <Route
          path="/metalRate"
          element={
            <ProtectedRoute>
              <MetalRate />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
