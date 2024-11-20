import categoriesCSS from "./categories.module.css"

function Categories(props){
    function hanldeCategoriesHide(){
        let categoriesContainer = document.getElementById("categoriesContainer")
        categoriesContainer.style.top = "-75%"
    }
    return(
        <>
        <div id="categoriesContainer" className="categories-container top-bottom">
            <button onClick={hanldeCategoriesHide}>X</button>
            <div className={categoriesCSS.cardContainer}>
                {props.categories.map((list)=>{
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