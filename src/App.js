import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import RecipeList from './components/RecipeList';
import Dashboard from './components/Dashboard';
import RecipeForm from './components/RecipeForm';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="d-flex">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/recipe" element={<RecipeList />} />
              <Route path="/add-recipe" element={<RecipeForm />} />
              <Route path="/edit-recipe/:id" element={<RecipeForm />} />

            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
