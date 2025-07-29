import {useState, useEffect} from 'react'
import './App.css';
import Search from '../src/Components/Search.jsx';
import MovieCard from "./Components/MovieCard.jsx";
import {useDebounce} from "react-use";
import {SearchCount, GetPopularMovies} from './appwrite.js'

const API_KEY_TMDB = import.meta.env.VITE_TMDB_API_KEY;

function App() {
    const [search, setSearch] = useState('');
    const [errormsg, setErrormsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [MovieList, setMovieList] = useState([]);
    const [debounce_search_term, setdebounce_search_term] = useState('');
    const [TrendingList, setTrendingList] = useState([]);

    useDebounce(() => {
        setdebounce_search_term(search)
    }, 700, [search])
    const API_OPTIONS = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY_TMDB}`,
        },
    };
    const Fectch_Movies = async (search_query = "") => {
        console.log("Search Query:", search_query);
        const Endpoint = search_query ? `${import.meta.env.VITE_TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(search_query)}`
            : `${import.meta.env.VITE_TMDB_BASE_URL}/discover/movie?sort_by=popularity.desc`;
        setLoading(true);
        try {
            const response = await fetch(Endpoint, API_OPTIONS);
            if (!response.ok) {

                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data.results);
            setMovieList(data.results);
            if (search_query && data.results.length > 0) {
                await SearchCount(search_query, data.results[0]);
            }
            setLoading(false);
        } catch (e) {
            console.log("This is the Error Occurred", e);
            setErrormsg("Oops something went wrong and movies are not rendered");
            setLoading(false);
        }
    };
    const gettrendingmoies = async (search_query = "") => {
        const trendingmovies = await GetPopularMovies();
        console.log(trendingmovies);
        setTrendingList(trendingmovies)

    }
    useEffect(() => {
        gettrendingmoies();
    }, []);
    useEffect(() => {
        try {
            Fectch_Movies(debounce_search_term);
        } catch (e) {
            console.log(e, "This is the Error Occuried")
            setErrormsg("Oops something went wrong and movies are rendered")
        }
    }, [debounce_search_term])
    const SearchTermSet = (searchterm) => {
        setSearch(searchterm);
    }

    return (
        <main>

            <div className="pattern"/>
            {/*<img src={heropng_1} alt=""/> */}

            <div className="wrapper">
                <header>
                    <img src="./hero-card-banner.png" alt=""/>
                    <h1>Find <span className="text-gradient">Movies</span> You’ll Love Without the Hassle</h1>
                    <Search search={search} setsearch={SearchTermSet}/>
                </header>
                {/*<h3 className="text-white">{search}</h3>*/}
                <section className="trending">
                    <h2 className="my-2 p-2">Treding Movies</h2>
                    <ul>
                        {TrendingList.map((movie, index) => (
                            <li key={movie.id}>
                                <p>{index + 1}</p>
                                <img src={movie.poster_url} alt="posterurl"/>
                            </li>
                        ))}

                    </ul>
                </section>
                <section className=" mt-8 mb-6s">
                    <h2 className="my-2">Popular Moies</h2>
                    {loading ? (<p className="text-white">Loading.......</p>) : errormsg ? (
                            <p className="text-center">Error</p>) :
                        (<ul className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {MovieList.length > 0 ? MovieList.map((movie, index) => (
                                <MovieCard movie_data={movie} key={index} id={index}/>
                            )) : (<p>Moies Are Not avaliable</p>)}

                        </ul>)}

                </section>
            </div>
        </main>
    )
}

export default App
