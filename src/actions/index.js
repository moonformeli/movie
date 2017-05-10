export const STORE_API_MOVIES = "STORE_API_MOVIES";
export const PAGE_MOVIE_API = "PAGE_MOVIE_API";
export const RESET_MOVIE_CONTAINER = "RESET_MOVIE_CONTAINER"

export function removeMovies_API() {
    return {
        type: RESET_MOVIE_CONTAINER
    }
}

export function storeMovies_API(data){
    return {
        type: STORE_API_MOVIES,
        data
    };
}

export function nextPage() {
    return {
        type: PAGE_MOVIE_API  
    };
}

export function moviesFromAPI(url) {
    return (dispatch) => {
            fetch(url)
                .then((response) => {
                    if(!response.ok) {
                        throw Error(response.statusText);
                    }
                    
                    dispatch(nextPage());
                    
                    return response;
                })
                .then((response) => response.json())
                .then((data) => {
                    data.results.map((data, i) => {
                        let state = {};
                        state.original_title = data.original_title;
                        state.overview = data.overview;
                        state.release_date = data.release_date;
                        state.vote_arrange = data.vote_average;
                        state.vote_count = data.vote_count;
                        state.poster_path = "http://image.tmdb.org/t/p/w185/" + data.poster_path;
                        state.popularity = data.popularity;
                        
                        dispatch(storeMovies_API(state));
                    });
                })
                .catch((err) => console.error(err));
        }
}