import Header from './components/header';
import Movie from './pages/movie';
import MovieDetail from './pages/movieDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App(){
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Movie />} />
          <Route path='/movie/:movieId' element={<MovieDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;