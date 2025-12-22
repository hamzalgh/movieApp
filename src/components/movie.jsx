import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMovies } from "../redux/slices/movieSllice";
import { Link } from "react-router-dom";
import apiKey from "../API/APIKey";
import { StarIcon } from "lucide-react";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Skeleton } from "./ui/skeleton";


function Movie(){
    const dispatch = useDispatch()
    const movies = useSelector((state) => state.movies.movies)

    const fetchMovies = async () => {
        const response = await axios
        .get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=1`)
        .catch((err) => console.log("Err", err))

        const response2 = await axios
        .get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=2`)
        .catch((err) => console.log("Err", err))

        response.data.results = response.data.results.concat(response2.data.results)

        dispatch(setMovies(response.data.results))
    }
    useEffect(() => {
        fetchMovies()
        return () => {
            dispatch(setMovies([]))
        }
    }, [])

    return(
        <>
        {movies.length > 0 ? (
            <main className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] justify-items-center gap-4">
                {movies.map((movie)=>{
                    return (
                    <Card key={movie.id} className="mt-5 pt-0 pb-3 overflow-hidden">
                        <Link to={`/movie/${movie.id}`}>
                            <CardHeader className="p-0 relative">
                                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-md flex items-center">
                                    <StarIcon className="h-3 w-3 text-yellow-500 mr-1" />
                                    {movie.vote_average.toFixed(1)}
                                </div>
                                {movie.poster_path ? <img className="w-[200px] h-[300px]" src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} /> : <div className='w-[200px] h-[300px] bg-black text-white text-2xl flex justify-center items-center'><p>not found</p></div>}
                                <CardTitle className="p-3 pb-2">{movie.title.length < 20 ? movie.title : movie.title.slice(0,21) + "..."}</CardTitle>
                                <CardDescription className="pl-3">{movie.release_date.slice(0,4)}</CardDescription>
                            </CardHeader>
                        </Link>
                    </Card>
                    )
                })}
            </main>
        ) : (
            <main className="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] justify-items-center gap-4">
                {Array.from({ length: 20 }).map((_, index) => (
                    <Card key={index} className="mt-5 pt-0 pb-3 overflow-hidden">
                        <CardHeader className="p-0">
                            <Skeleton className="w-[200px] h-[300px] rounded-b-none" />
                            <Skeleton className="h-4 w-[150px] m-3" />
                            <Skeleton className="h-4 w-[70px] ml-3" />
                        </CardHeader>
                    </Card>
                ))}
            </main>
        )}
        </>
    )
}
export default Movie