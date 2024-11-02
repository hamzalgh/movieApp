import { Component } from "react"

class Navbar extends Component{
    render(){
        function hanldeCategoriesShow(){
            let categoriesContainer = document.getElementById("categoriesContainer")
            categoriesContainer.style.top = "0"
        }
        return(
            <nav>
                <div className="links">
                    <h2>brand</h2>
                    <div>
                        <p>films</p>
                        <p>artistes</p>
                        <p>plus</p>
                    </div>
                </div>
                <button onClick={hanldeCategoriesShow}>categories</button>
                <div className="signing">
                    <p>sign up</p>
                    <p>join us</p>
                </div>
            </nav>
        )
    }
}
export default Navbar