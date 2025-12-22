import Categories from "./categories"
import MovieSearch from "./movieSearch"
import { Button } from "./ui/button"

function Navbar(){
    return(
        <nav className="flex justify-around items-center py-4 bg-background/95 shadow-md sticky top-0 z-20">
            <p className="font-bold hover:underline hover:cursor-pointer text-xl">movies</p>
            <aside className="flex justify-between items-center gap-6 text-xl">
                <Categories />
                <MovieSearch />
            </aside>
            <aside className="flex justify-between items-center gap-4">
                <Button className="bg-gray-800 cursor-pointer">log in</Button>
                <Button variant="ghost" className="border-2 hover:bg-gray-800 hover:text-white cursor-pointer">sign up</Button>
            </aside>
        </nav>
    )
}
export default Navbar