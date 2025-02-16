import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../redux/slices/movieSllice";
import { Link } from "react-router-dom";
import apiKey from "../API/APIKey";

function Movie(){
    const dispatch = useDispatch()
    const movies = useSelector((state) => state.movies.movies)

    const fetchMovies = async () => {
        const response = await axios
        .get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`)
        .catch((err) => console.log("Err", err))

        dispatch(setMovies(response.data.results))
    }
    useEffect(() => {
        fetchMovies()
    }, [])

    return(
        <>
        {movies.length > 0 ? (
            <div className="card-container">
                {movies.map((movie)=>{
                    return (
                    <div key={movie.id} className="card">
                        <Link className="link" to={`/movie/${movie.id}`}>
                            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
                            <div className="card-content">
                                <h3 className='card-title'>{movie.title.length < 33 ? movie.title : movie.title.slice(0,34) + "..."}</h3>
                            </div>
                        </Link>
                    </div>
                    )
                })}
            </div>
        ) : (
            <p className="loading">Loading...</p>
        )}
        </>
    )
}
export default Movie