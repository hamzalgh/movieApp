import MovieSearch from "./movieSearch"

function Navbar(){
    function hanldeCategoriesShow(){
        let categoriesContainer = document.getElementById("categoriesContainer")
        categoriesContainer.style.top = "0"
    }

    return(
        <nav>
            <div className="links">
                <h2>brand</h2>
                <div>
                    <p>TV shows</p>
                    <p>films</p>
                    <p onClick={hanldeCategoriesShow}>categories</p>
                </div>
            </div>
            <MovieSearch />
            <div className="signing">
                <p>log in</p>
                <p className="signUp">sign up</p>
            </div>
        </nav>
    )
}
export default Navbar