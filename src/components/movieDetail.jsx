import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectedMovie, setRelated, setSimilar } from "../redux/slices/movieSllice";
import { Link } from "react-router-dom";
import apiKey from '../API/APIKey';

import CSS from './movieDetail.module.css'

function MovieDetail(){
    const {movieId} = useParams()
    const dispatch = useDispatch()
    const movie = useSelector((state) => state.movies.movie)
    const dependency = useSelector((state) => state.movies.dependency)
    
    const fetchMovie = async () => {
        const response = await axios
        .get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
        .catch((err) => console.log("Err", err))
        // dispatching the movie details
        dispatch(selectedMovie(response.data))

        const similarRes = await axios
        .get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`)
        .catch((err) => console.log("Err", err))
        // dispatching the first 5 similar movies
        dispatch(setSimilar(similarRes.data.results.slice(0, 6)))

        const relatedRes = await axios
        .get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${apiKey}`)
        .catch((err) => console.log("Err", err))
        // dispatching the first 5 related movies
        dispatch(setRelated(relatedRes.data.results.slice(0, 6)))        
    }
    useEffect(() => {
        fetchMovie()
        return () => {
            dispatch(selectedMovie({}))
            dispatch(setSimilar([]))
            dispatch(setRelated([]))
        }
    }, [movieId])
    
    {if (Object.keys(movie).length > 0) {
        const {id, title, overview, genres, status, release_date, backdrop_path, poster_path, spoken_languages} = movie;
        const {similar, related} = dependency;
        
        return(
            <div key={id} className={CSS.movieDetail}>
                <img className={CSS.backdrop} src={`https://image.tmdb.org/t/p/w200/${backdrop_path}`} alt={movie.title} />
                <hr />
                <div className={CSS.film}>
                    {poster_path ? <img className={CSS.image} src={`https://image.tmdb.org/t/p/w200/${poster_path}`} alt={movie.title} /> : <div className='not-found-poster'><p>not found</p></div>}
                </div>

                <div className={CSS.info}>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    <p className={CSS.title} style={{marginBottom: "3px"}}>country US</p>
                                    <p className={CSS.title} style={{fontSize: "15px"}}>languages available</p>
                                    {spoken_languages.map(language => <p>{language.name}</p>)}
                                </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <p className={CSS.title}>{status}</p>
                                    <p>{release_date}</p>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>
                                    <p className={CSS.title}>types</p>
                                    {genres.map(type => <p key={type.id}>{type.name}</p>)}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <div className={CSS.detail}>
                    <div className={CSS.buttons}>
                        <button className={CSS.later}>later</button>
                        <button className={CSS.like}>like</button>
                    </div>

                    <div className={CSS.overview}>
                        <h2 className={CSS.title}>{title}</h2>
                        <p>{overview}</p>
                    </div>
                    
                    <div className={CSS.related}>
                        <h2 className={CSS.title}>Related</h2>
                        <div className={CSS.similarContainer}>
                        {related.length > 0
                        ? related.map(item => {
                            return (
                                <div className={CSS.card}>
                                    <Link className='link' to={`/movie/${item.id}`}>
                                        {item.poster_path ? <img className={CSS.image} src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`} alt={movie.title} /> : <div className='not-found-poster'><p>not found</p></div>}
                                        <p>{item.title.length < 26 ? item.title : item.title.slice(0,26) + "..."}</p>
                                    </Link>
                                </div>
                            )
                        })
                        : <p>not found</p>}
                        </div>
                    </div>

                    <div className={CSS.similar}>
                        <h2 className={CSS.title}>watch also</h2>
                        <div className={CSS.similarContainer}>
                        {similar.length > 0
                        ? similar.map(item => {
                            return (
                                <div className={CSS.card}>
                                    <Link className='link' to={`/movie/${item.id}`}>
                                        {item.poster_path ? <img className={CSS.image} src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`} alt={movie.title} /> : <div className='not-found-poster'>not found</div>}
                                        <p>{item.title.length < 26 ? item.title : item.title.slice(0,26) + "..."}</p>
                                    </Link>
                                </div>
                            )
                        })
                        : <p>not found</p>}
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <p className={CSS.loading}>Loading ...</p>
    }}
}
export default MovieDetail