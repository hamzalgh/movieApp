import './App.css';
import Header from './components/header';
import Movie from './components/movie';
import MovieDetail from './components/movieDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App(){
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Movie />} />
          <Route path='/movie/:movieId' element={<MovieDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;