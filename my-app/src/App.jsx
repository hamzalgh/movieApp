import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar';
import Movie from './components/movie';
import Categories from './components/categories';

function App(){
  const [data, setData] = useState(null)
  const [categories, setCategories] = useState(null)

  useEffect(()=>{
    const fetchData = async () => {
      try{
        const res = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=9c138d9a480ab0a47e117144089495c6")
        const data = await res.json()
        
        const categoryRes = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=9c138d9a480ab0a47e117144089495c6&language=en-US')
        const categories = await categoryRes.json()
        
        setData(data.results)
        setCategories(categories.genres)
      }catch(err){
        console.log(err)
      }
    }

    fetchData()
  },[])

  return (
    <>
      {data ? (
        <>
          <Navbar categories={categories} />
          <Categories categories={categories} />
          <Movie data={data} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
  
}

export default App;