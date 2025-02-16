import categoriesCSS from "./categories.module.css";

import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategorie } from "../redux/slices/categorieSlice";
import apiKey from "../API/APIKey";

function Categories(){
    function hanldeCategoriesHide(){
        let categoriesContainer = document.getElementById("categoriesContainer")
        categoriesContainer.style.top = "-75%"
    }

    const dispatch = useDispatch()
    const categories = useSelector((state) => state.categories.categories)

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
        <>
        <div id="categoriesContainer" className="categories-container top-bottom">
            <button onClick={hanldeCategoriesHide}>X</button>
            <div className={categoriesCSS.cardContainer}>
                {categories.map((list)=>{
                    return (
                    <div key={list.id} className={categoriesCSS.card}>
                        <div className={categoriesCSS.cardContent}>
                            <h3 className={categoriesCSS.cardTitle}>{list.name}</h3>
                        </div>
                    </div>
                    )
                })}
            </div>
        </div>
        </>
    )
}
export default Categories