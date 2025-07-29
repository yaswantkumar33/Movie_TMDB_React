import React from 'react';

const Search = ({search, setsearch}) => {

    // const input_debounce = (func = () => {
    //     console.log("debouncer working")
    // }, timerout = 300) => {
    //     let timer;
    //     return (...args) => {
    //         clearTimeout(timer);
    //         timer = setTimeout(() => {
    //             func.apply(this, args)
    //         }, timerout)
    //     }
    //
    // }
    return (


        <div className="search relative flex items-center">
            <img src="search-svg.svg" className="ml-3" alt="Search icon"/>
            <input type="text" placeholder="Search Over 1000+ Fav Movies" value={search}
                   onChange={(e) => setsearch(e.target.value)}/>
        </div>
    );
};

export default Search;