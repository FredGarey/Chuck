import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import JokeDetails from './Joke/JokeDetails/JokeDetails';
import Search from './Search/Search'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/jokes/:id" element={<JokeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
