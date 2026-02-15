import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectedMovie, setRelated, setSimilar } from "../redux/slices/movieSllice";
import { Link } from "react-router-dom";
import apiKey from '../API/APIKey';
import { Calendar, StarIcon, HeartIcon, Clock } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";


import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


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
        const {id, title, overview, genres, release_date, poster_path, spoken_languages, vote_average, runtime} = movie;
        const {similar, related} = dependency;
        const movieTime = runtime ? `${Math.floor(runtime/60)}h ${runtime%60}m` : "not found"
        
        return(
            <main key={id} className="mt-5 ml-5">
                <header className="flex gap-6">
                    <Card className="rounded-xl p-0 w-[fit-content] overflow-hidden flex-shrink-0">
                        <CardHeader className="p-0">
                            {poster_path ? <img className="w-[300px] h-[450px]" src={`https://image.tmdb.org/t/p/w200/${poster_path}`} alt={movie.title} /> : <div className='w-[300px] h-[450px] bg-black text-white text-center'><p>not found</p></div>}
                        </CardHeader>
                    </Card>

                    <section>
                        <h1 className="text-4xl font-bold my-3">{title}</h1>
                        <div className="flex items-center gap-4 my-3">
                            <h1 className="text-muted-foreground flex items-center gap-1"><StarIcon className="text-yellow-500" size={18}/> {vote_average}</h1>
                            <h1 className="text-muted-foreground flex items-center gap-1"><Calendar size={18}/> {release_date}</h1>
                            <h1 className="text-muted-foreground flex items-center gap-1"><Clock size={18}/> {movieTime}</h1>
                        </div>
                        <div className="flex items-center my-3">
                            <div>
                                <h2 className="text-lg font-semibold">categories</h2>
                                {genres.map(genre => <Badge variant="secondary" className="mr-3 mt-3 py-1 font-semibold">{genre.name}</Badge>)}
                            </div>
                            <div className="bg-border w-[1px] h-[50px] mr-3"/>
                            <div>
                                <h2 className="text-lg font-semibold">languages</h2>
                                <div className="flex gap-3 mt-3 ">{spoken_languages.map(lang => <Badge variant="secondary" className="mr-3 py-1 font-semibold">{lang.english_name}</Badge>)}</div>
                            </div>
                        </div>
                        <p>{overview}</p>
                        <div className="flex items-center gap-4 my-3">
                            <Button className="cursor-pointer" size="lg">watch now</Button>
                            <Button className="cursor-pointer" variant="outline" size="lg"><HeartIcon /> add to fav</Button>
                        </div>
                    </section>
                </header>
                
                <article>
                    <section>
                        <h2 className="text-4xl font-bold mt-5">Related</h2>
                        <div className="flex gap-5">
                            {related.length > 0
                            ? related.map(item => {
                                return (
                                    <Card key={item.id} className="mt-5 pt-0 pb-3 overflow-hidden">
                                        <Link to={`/movie/${item.id}`}>
                                            <CardHeader className="p-0 relative">
                                                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-md flex items-center">
                                                    <StarIcon className="h-3 w-3 text-yellow-500 mr-1" />
                                                    {item.vote_average.toFixed(1)}
                                                </div>
                                                {item.poster_path ? <img className="w-[200px] h-[300px]" src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`} alt={movie.title} /> : <div className='w-[200px] h-[300px] bg-black text-white text-center'><p>not found</p></div>}
                                                <CardTitle className="p-3 pb-2">{item.title.length < 15 ? item.title : item.title.slice(0,16) + "..."}</CardTitle>
                                                <CardDescription className="pl-3">{item.release_date.slice(0,4)}</CardDescription>
                                            </CardHeader>
                                        </Link>
                                    </Card>
                                )
                            })
                            : <p className="text-2xl text-muted-foreground">not found</p>}
                        </div>
                    </section>

                    <section>
                        <h2 className="text-4xl font-bold mt-5">watch also</h2>
                        <div className="flex gap-5">
                            {similar.length > 0
                            ? similar.map(item => {
                                return (
                                    <Card key={item.id} className="mt-5 pt-0 pb-3 overflow-hidden">
                                        <Link to={`/movie/${item.id}`}>
                                            <CardHeader className="p-0 relative">
                                                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs font-medium px-2 py-1 rounded-md flex items-center">
                                                    <StarIcon className="h-3 w-3 text-yellow-500 mr-1" />
                                                    {item.vote_average.toFixed(1)}
                                                </div>
                                                {item.poster_path ? <img className="w-[200px] h-[300px]" src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`} alt={movie.title} /> : <div className='w-[200px] h-[300px] bg-black text-white text-center'><p>not found</p></div>}
                                                <CardTitle className="p-3 pb-2">{item.title.length < 15 ? item.title : item.title.slice(0,16) + "..."}</CardTitle>
                                                <CardDescription className="pl-3">{item.release_date.slice(0,4)}</CardDescription>
                                            </CardHeader>
                                        </Link>
                                    </Card>
                                )
                            })
                            : <p className="text-2xl text-muted-foreground">not found</p>}
                        </div>
                    </section>
                </article>
            </main>
        )
    } else {
        return (
            <main className="mt-5 ml-5">
                <header className="flex gap-6">
                    <Card className="rounded-xl p-0 w-[fit-content] overflow-hidden flex-shrink-0">
                        <CardHeader className="p-0">
                            <Skeleton className="w-[300px] h-[450px]"/>
                        </CardHeader>
                    </Card>
                    <section className="w-full">
                        <Skeleton className="h-8 w-[350px] my-3 rounded-xl" />
                        <div className="flex items-center gap-4 my-3 mb-4">
                            <Skeleton className="h-5 w-[50px] rounded-sm" />
                            <Skeleton className="h-5 w-[80px] rounded-sm" />
                            <Skeleton className="h-5 w-[60px] rounded-sm" />
                        </div>
                        <div className="flex items-center my-3 mb-4">
                            <div>
                                <Skeleton className="h-5 w-[100px] rounded-xl" />
                                <div className="flex items-center gap-1">
                                    <Skeleton className="h-5 w-[80px] mr-3 mt-3 rounded-sm" />
                                    <Skeleton className="h-5 w-[60px] mr-3 mt-3 rounded-sm" />
                                    <Skeleton className="h-5 w-[50px] mr-3 mt-3 rounded-sm" />
                                </div>
                            </div>
                            <div className="bg-border w-[1px] h-[50px] mr-3"/>
                            <div>
                                <Skeleton className="h-5 w-[100px] rounded-xl" />
                                <div className="flex items-center gap-1">
                                    <Skeleton className="h-5 w-[60px] mr-3 mt-3 rounded-sm" />
                                    <Skeleton className="h-5 w-[50px] mr-3 mt-3 rounded-sm" />
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <Skeleton className="w-full h-[20px] rounded-xl mb-3"/>
                            <Skeleton className="w-full h-[20px] rounded-xl mb-3"/>
                            <Skeleton className="w-[50%] h-[20px] rounded-xl mb-3"/>
                        </div>
                        <div className="flex items-center gap-4 my-3">
                            <Skeleton className="w-[120px] h-[40px] rounded-sm" />
                            <Skeleton className="w-[120px] h-[40px] rounded-sm" />
                        </div>
                    </section>
                </header>

                <article>
                    <section>
                        <Skeleton className="h-8 w-[150px] mt-5 rounded-xl" />
                        <div className="flex gap-5">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <Card key={index} className="mt-5 pt-0 pb-3 overflow-hidden">
                                    <CardHeader className="p-0">
                                        <Skeleton className="w-[200px] h-[300px] rounded-b-none" />
                                        <Skeleton className="h-4 w-[150px] m-3" />
                                        <Skeleton className="h-4 w-[70px] ml-3" />
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </section>

                    <section>
                        <Skeleton className="h-8 w-[200px] mt-5 rounded-xl" />
                        <div className="flex gap-5">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <Card key={index} className="mt-5 pt-0 pb-3 overflow-hidden">
                                    <CardHeader className="p-0">
                                        <Skeleton className="w-[200px] h-[300px] rounded-b-none" />
                                        <Skeleton className="h-4 w-[150px] m-3" />
                                        <Skeleton className="h-4 w-[70px] ml-3" />
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </section>
                </article>
            </main>
        )
    }}
}
export default MovieDetail