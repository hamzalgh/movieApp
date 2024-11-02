import { Component } from "react"

class Movie extends Component{
    render(){
        return(
            <>
            <div className="card-container">
                {this.props.data.map((list)=>{
                    return (
                    <div key={list.id} className="card">
                        <img src={`https://image.tmdb.org/t/p/w200/${list.poster_path}`} alt={list.title} />
                        <div className="card-content">
                            <h3 className='card-title'>{list.title}</h3>
                        </div>
                    </div>
                    )
                })}
            </div>
            </>
        )
    }
}
export default Movie