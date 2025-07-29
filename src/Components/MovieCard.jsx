import React from 'react';
import star from '../../public/star.svg';

const MovieCard = ({movie_data, id}) => {
    return (
        <div id={id} className="movie-card">
            <img
                src={movie_data.poster_path && movie_data.poster_path ? `https://image.tmdb.org/t/p/w500${movie_data.backdrop_path}` : "../../public/vite.svg"}
                alt="Movie poster"/>
            <h3 className=" font-bold text-[16px] my-[12px] w-[100%]">{movie_data.title}</h3>
            <div className="content">
                <div className="rating">
                    <img src={star}
                         alt=""/><p>{(movie_data.vote_average / 2).toFixed(1)}</p>  <span>•</span>
                    <p>{movie_data.original_language}</p> <span>•</span> <p>{movie_data.release_date.split("-")[0]}</p>
                    <span>•</span> <p>Movie</p>
                </div>
            </div>


        </div>
    );
};

export default MovieCard;