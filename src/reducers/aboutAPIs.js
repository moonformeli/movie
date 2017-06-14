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

export function aboutRecommendation(state = {recommendation: []}, action) {
    switch(action.type) {
        case types.RECOMMEND_MOVIES:
            return { ...state, recommendation:update(
                state.recommendation, {
                    $push: [action.data]
                }    
            )};
        case types.EMPTY_RECOMMENDATION:
            return { recommendation: [] };
        default:
            return state;
    }
}

export function aboutFavorite(state = {movieData: { movies: []}}, action) {
    switch(action.type) {
        case types.STORE_FAVORITE_MOVIES:
            return { movieData: action.data }
        default:
            return state;
    }
}

export function aboutAPIs(state = initialState, action) {
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
              page:[{page:1},{page:1},{page:1},{page:1},{page:1},{page:1},{page:1},{page:1},{page:1},{page:1},{page:1},{page:1},{page:1},
                    {page:1},{page:1},{page:1},{page:1},{page:1},{page:1}]
              };
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
            }
        default:
            return state;
    }
}