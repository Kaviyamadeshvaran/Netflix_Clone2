import React, { useEffect, useRef ,useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import {Link} from 'react-router-dom'

const TitleCards = ({title, category}) => {

    const [apiData, setApiData] = useState([]);
    const cardsRef = useRef();
    
    const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MWYzYTIxYzg5M2M0ZDFkZTlmMWQwMmE5OWIwMzBhYSIsIm5iZiI6MTcyODcwMDI2MS45OTA5MjMsInN1YiI6IjY3MDlkZDU5MzA0NDVhNzM3YjYyMzdmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.o7dpSVsvPwZJBmiOBgUib5-nHXweo0i5FWlMOHNV8XA'
    }
  };


const handleWheel=(event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
}
useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel',handleWheel);
},[])

return (
    <div className='title-cards'>
        <h2>{title?title:"Popular on Netflix"}</h2>
        <div className="card-list" ref={cardsRef}>
            {apiData.map((card,index)=>{
                return <Link to={`/player/${card.id}`} className="card" key={index}>
                    <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
                    <p>{card.original_title}</p>
                </Link>
            })}

        </div>
      
    </div>
  )
}

export default TitleCards
