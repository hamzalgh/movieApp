import React, { Component } from 'react';
import './App.css';

import Navbar from './components/navbar';
import Movie from './components/movie';
import Categories from './components/categories';

class App extends Component{
  state = {
    data: [],
    categories: []
  }

  async componentDidMount(){

    try{
      const res = await fetch("https://api.themoviedb.org/3/discover/movie?api_key=9c138d9a480ab0a47e117144089495c6")
      const data = await res.json()
      
      const categoryRes = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=9c138d9a480ab0a47e117144089495c6&language=en-US')
      const categories = await categoryRes.json()
      
      this.setState({data: data.results})
      this.setState({categories: categories.genres})
    }catch(err){
      console.log(err)
    }
  }

  render(){
    const {data} = this.state
    const {categories} = this.state
    return (
      <>
        <Navbar categories={categories} />
        <Categories categories={categories} />
        <Movie data={data} />
        {/* <div className="card-container">
          {data.map((list)=>{
            return (
              <div key={list.id} className="card">
                <img src={`https://image.tmdb.org/t/p/w200/${list.poster_path}`} alt={list.title} />
                <div className="card-content">
                  <h3 className='card-title'>{list.title}</h3>
                </div>
              </div>
            )
          })}
        </div> */}
      </>
    );
  }
}

export default App;
