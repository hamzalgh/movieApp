import MovieSearch from "./movieSearch"
import { Button } from "./ui/button"
import { Checkbox } from "./ui/checkbox"

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
                <Button>log in</Button>
                <p className="signUp">sign up</p>
                <Checkbox />
            </div>
        </nav>
    )
}
export default Navbar