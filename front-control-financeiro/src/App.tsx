import { Navigate, Route, Routes } from "react-router-dom";
import { RequireAuth } from "./hooks/auth/useRequireAuth";
import Login from "./components/Login";
import { Teste } from "./components/teste";
import Register from "./components/Register";
import Modal from 'react-modal';

Modal.setAppElement('#root');

export function App() {
  return (
    <div className="App">
      {/* <header>
      <h1>Hello Marouane</h1>
      <nav>
        ...
      </nav>
      </header> */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/teste" element={
        <RequireAuth>
          <Teste />
        </RequireAuth>
      } />
      </Routes>
    </div>
  );
}


