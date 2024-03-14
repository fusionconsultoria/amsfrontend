// Hooks
import { useAuth } from "./hooks/useAuth";

// router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// components
import NavComponent from './components/Navbar/Navbar';

// pages
import Home from "./pages/Home/Home";
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import EditProfile from './pages/EditProfile/EditProfile';
import NewPost from './pages/NewPost/NewPost';
import Dashboard from './pages/Dashboard/Dashboard';
import Note from './pages/Note/Note';
import Search from './pages/Search/Search';
import Editar from './pages/Editar/Editar';
import History from './pages/History/History';
import Narrativas from './pages/Narrativas/Narrativas';
import Modulo from "./pages/Modulo/Modulo";
import Users from "./pages/User/Users";

function App() {

  const { auth, loading, isAdmin } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavComponent />
        <div className="container" style={{ marginTop: '100px' }}>
          <Routes>
            <Route
              path="/"
              element={auth ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/new"
              element={auth ? <NewPost /> : <Navigate to="/login" />}
            />
            <Route
              path="/processoNegocio"
              element={auth && isAdmin ? <Modulo /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={auth ? <EditProfile /> : <Navigate to="/login" />}
            />
            <Route
              path="/users/:id"
              element={auth ? <Dashboard /> : <Navigate to="/login" />}
            />
            <Route
              path="/note/:id"
              element={<Note />}
            />
            <Route
              path="/editar/:id"
              element={auth && isAdmin ? <Editar /> : <Navigate to="/login" />}
            />

            <Route
              path="/history/:id"
              element={auth ? <History /> : <Navigate to="/login" />}
            />
            <Route
              path="/narrativas/:id"
              element={<Narrativas />}
            />
            <Route
              path="/search"
              element={auth ? <Search /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={auth && isAdmin ? <Register /> : <Navigate to="/login" />}
            />
            <Route
              path="/users"
              element={auth && isAdmin ? <Users /> : <Navigate to="/login" />}
            />
            <Route />
          </Routes>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
