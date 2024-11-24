import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../redux/slices/movieSllice";

function Movie(){
    const dispatch = useDispatch()
    const movies = useSelector((state) => state.movies.movies)

    const fetchMovie = async () => {
        const response = await axios
        .get("https://api.themoviedb.org/3/discover/movie?api_key=9c138d9a480ab0a47e117144089495c6")
        .catch((err) => console.log("Err", err))

        dispatch(setMovies(response.data.results))
    }
    useEffect(() => {
        fetchMovie()
    }, [])

    return(
        <>
        {movies ? (
            <div className="card-container">
                {movies.map((movie)=>{
                    return (
                    <div key={movie.id} className="card">
                        <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
                        <div className="card-content">
                            <h3 className='card-title'>{movie.title}</h3>
                        </div>
                    </div>
                    )
                })}
            </div>
        ) : (
            <p>Loading...</p>
        )}
        </>
    )
}
export default Movie