import * as types from '../actions';
import update from 'react-addons-update';

const initialState = {
    genre: 28,
    pointer: 0,
    
    movieData:[
        [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]
    ],
    
    page:[{page:1},{page:1},{page:1},{page:1},{page:1},{page:1},{page:1},{page:1},{page:1},{page:1},{page:1},{page:1},{page:1},
        {page:1},{page:1},{page:1},{page:1},{page:1},{page:1}],
        
    rating: [
        [{stars:0}],[{stars:0}],[{stars:0}],[{stars:0}],
        [{stars:0}],[{stars:0}],[{stars:0}],[{stars:0}],
        [{stars:0}],[{stars:0}],[{stars:0}],[{stars:0}],
        [{stars:0}],[{stars:0}],[{stars:0}],[{stars:0}],
        [{stars:0}],[{stars:0}],[{stars:0}]  
    ]
};

export function aboutFavorite(state = {movieData: {}}, action) {
    switch(action.type) {
        case types.STORE_FAVORITE_MOVIES:
            return { movieData: action.data }
        default:
            return state;
    }
}

export default function aboutAPIs(state = initialState, action) {
    switch(action.type) {
        case types.STORE_API_MOVIES:
            return {...state, movieData: update(
                state.movieData, {
                    [state.pointer]: {
                        $push: [action.data]
                    }
                }
                )
                , rating: update(
                    state.rating, {
                        [state.pointer]: {
                            $push: [{stars:0}]
                        }
                    }
            )};
        case types.PAGE_MOVIE_API:
            return {...state, page: update(
                    state.page, {
                        [state.pointer] : {
                            page: {$set: state.page[state.pointer].page + 1}
                        }
                    }
                )
            };
            
        case types.RESET_MOVIE_CONTAINER:
            return {
              ...state, movieData: [ [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[] ], 
              page: update(
                    state.page, {
                        [state.pointer]: {
                            page: {$set:1}
                        }
                    }            
            )};
        case types.SELECTED_GENRE:
            return { ...state,
                genre: action.genre,
                pointer: action.pointer
            }
        case types.SET_MOVIE_RATING:
            return { ...state, rating: action.obj}
        case types.REMOVE_RATING:
            return { ...state,
                rating: [
                    [{stars:0}],[{stars:0}],[{stars:0}],[{stars:0}],
                    [{stars:0}],[{stars:0}],[{stars:0}],[{stars:0}],
                    [{stars:0}],[{stars:0}],[{stars:0}],[{stars:0}],
                    [{stars:0}],[{stars:0}],[{stars:0}],[{stars:0}],
                    [{stars:0}],[{stars:0}],[{stars:0}]  
                ]
                /*rating: update(
                    state.rating, {
                        [state.pointer]: {
                            $push: [{stars:0}]
                        }
                    })*/
            }
        /*
        case types.MOVIE_RATING:
            return {...state, rating: update(
                state.rating, {
                    [state.pointer]: {
                        [action.index]: {
                            stars: {$set:action.stars}                            
                        }
                    }
                }
            )};
        case types.MOVIE_RATING_HEROKU:
            return {...state, rating: update(
                state.rating, {
                    [action.pointer]: {
                        [action.index]: {
                            stars: {$set:action.stars}
                        }
                    }
                }    
            )};
        case types.MOVIE_GENRE:
            return {...state, 
                genre: action.genre,
                pointer: action.index
            };
        case types.PAGE_FIRST_LOADING:
            return {...state, page: update(
                state.page, {
                    [state.pointer]: {
                        isFirst: {$set:false}
                    }
                }
            )};
        case types.FETCH_DATA_SUCCESS:
            return {...state, data: action.data};  
            */
        default:
            return state;
    }
}