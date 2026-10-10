import { NavLink, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Todos from './pages/Todos';
import Posts from './pages/Posts';

export default function App() {
  return (
    <div className="app">
      <nav className="nav">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/todos">Todos</NavLink>
        <NavLink to="/posts">Posts</NavLink>
      </nav>

      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </main>
    </div>
  );
}