import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategorie } from "../redux/slices/categorieSlice";
import { setMovies } from "../redux/slices/movieSllice";
import apiKey from "../API/APIKey";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

function Categories(){
    const dispatch = useDispatch()
    const categories = useSelector((state) => state.categories.categories)
    const [selectedCategory, setSelectedCategory] = useState("all");

    const handleCategoryChange = (categoryValue) => {
        setSelectedCategory(categoryValue);
        fetchMoviesByCategory(categoryValue);
    };

    const fetchMoviesByCategory = async (categoryValue) => {
        const categoryId = categoryValue === "all"
            ? ""
            : categories.find((list) => list.name === categoryValue).id;
      
        try {
            const response = await axios
            .get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${categoryId}&page=1`)
            .catch((err) => console.log("Err", err));

            const response2 = await axios
            .get(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${categoryId}&page=2`)
            .catch((err) => console.log("Err", err));

            response.data.results = response.data.results.concat(response2.data.results);
        
            dispatch(setMovies(response.data.results));
        } catch (err) {
            console.log("Error fetching movies:", err);
        }
    }

    const fetchCategorie = async () => {
        const response = await axios
        .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`)
        .catch((err) => console.log("Err", err))

        dispatch(setCategorie(response.data.genres))
    }
    useEffect(() => {
        fetchCategorie()
    }, [])

    return(
        <Select onValueChange={handleCategoryChange} value={selectedCategory}>
            <SelectTrigger className="w-[180px] bg-white cursor-pointer">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">all</SelectItem>
                {categories.map((list)=>{
                    return (
                        <SelectItem key={list.id} value={list.name}>{list.name}</SelectItem>
                    )
                })}
            </SelectContent>
        </Select>
    )
}
export default Categories