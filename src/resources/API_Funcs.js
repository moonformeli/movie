import $ from 'jquery';
import * as actions from '../actions';
import {store} from '../index';

const KEY = "268d70c982dabbd56d9db882a7112594";

class API_Funcs {
    
    findUser() {
        $.post('https://moon-test-heroku.herokuapp.com/findUser/favorite/movie', {id: localStorage.getItem('loginId')}, function(data, status){
            
        });
    }
    
    movieFromServer(page, genre) {
        store.dispatch(actions.moviesFromAPI('https://api.themoviedb.org/3/discover/movie?api_key=' + KEY + 
        '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + 
        page + '&with_genres=' + genre));
    }
    
}

export default API_Funcs;