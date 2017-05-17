export const STORE_API_MOVIES = "STORE_API_MOVIES";
export const STORE_FAVORITE_MOVIES = "STORE_FAVORITE_MOVIES";
export const PAGE_MOVIE_API = "PAGE_MOVIE_API";
export const RESET_MOVIE_CONTAINER = "RESET_MOVIE_CONTAINER";
export const SELECTED_GENRE = "SELECTED_GENRE";
export const SET_MOVIE_RATING = "SET_MOVIE_RATING";
export const REMOVE_RATING = "REMOVE_RATING";

export function set_favorite_rating(obj) {
    return {
        type: SET_MOVIE_RATING,
        obj
    }
}

export function remove_rating() {
    return {
        type: REMOVE_RATING
    }
}

export function set_selectedGenre(genre, pointer) {
    return {
        type: SELECTED_GENRE,
        genre,
        pointer
    }
}

export function removeMovies_API() {
    return {
        type: RESET_MOVIE_CONTAINER
    }
}

export function storeFavorite_movies(data) {
    return {
        type: STORE_FAVORITE_MOVIES,
        data
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
        Promise.resolve(
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
                .catch((err) => console.error(err))
            )
        }
}