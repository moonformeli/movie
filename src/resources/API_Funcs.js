import $ from 'jquery';
import * as actions from '../actions';
import {store} from '../index';

const KEY = "268d70c982dabbd56d9db882a7112594";

class API_Funcs{
    
    constructor() {
        rating:[
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]  
            ];
    }
    
    ratingChanged(newRating, pointer, i, data) {
        let state = {
                id: localStorage.getItem('loginId'),
                title: data.original_title,
                rating: newRating,
                img: data.poster_path,
                genre: pointer,
                index: i,
                isThisFirstTimeToMakeId: true
            };
            
            
            $.post('https://moon-test-heroku.herokuapp.com/findUser/favorite/movie', {id: localStorage.getItem('loginId')}, function(data, status){
                if(data == null || data.length == 0 || data == undefined || data==0) {
                    $.post('https://moon-test-heroku.herokuapp.com/insert/favorite/movie', state, function(result, stats){
                        console.log(JSON.stringify(result));
                    });
                }else{
                    let bool = false;
                    let nextState = {};
                    
                    //별점을 누른 영화가 이미 사용자가 선택한 적이 있는 영화인지 검색
                    
                    for(let i=0; i<data.movies.length; i++) {
                        if(data.movies[i].title == state.title) {
                            bool = true;
                            nextState.username = data.id;
                            nextState.title = data.movies[i].title;
                            nextState.newRating = newRating;
                        }
                        if(bool) break;
                    }
                
                    //영화가 이미 등록된 적이 있는 경우
                    if(bool) {
                        $.post('https://moon-test-heroku.herokuapp.com/update/favorite/movie', nextState, function(result, stats){
                            console.log('Update is done');
                        });
                    }else{
                        //그렇지 않은 경우는 해당 영화에 대한 정보를 등록한다.
                        state.isThisFirstTimeToMakeId = false;
                        $.post('https://moon-test-heroku.herokuapp.com/insert/favorite/movie', state, function(result,stats){
                            console.log('Create ID & Update is done');
                        });
                    }
                    
                }
            })
    }
    
    favoriteMovies() {
        return new Promise(resolve => 
            resolve($.post('https://moon-test-heroku.herokuapp.com/findUser/favorite/movie', {id: localStorage.getItem('loginId')}, function(data, status){
                store.dispatch(actions.storeFavorite_movies(data));
            }))
        );
    }
    
    initialRating(page) {
        let that = this;
        return new Promise((resolve, reject) => {
                resolve($.post('https://moon-test-heroku.herokuapp.com/findUser/favorite/movie', {id: localStorage.getItem('loginId')}, function(data, status){
                    //data.genre : pointer
                    //data.index : pointer.index
                    let replaced_rating = [
                        [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]  
                    ];
                    let sortedItemByGenre = [
                        [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]  
                    ];
                    let dataToSort = data.movies;
                    
                    // 받아온 데이터를 장르별로 재 분류
                    // Resorting data by genre
                    for(let i=0; i<dataToSort.length; i++){
                        sortedItemByGenre[dataToSort[i].genre].push(dataToSort[i]);    
                    }
                    
                    // sortedItemByGenre 정렬
                    // Sort sortedItemByGenre
                    for(let i=0; i<sortedItemByGenre.length; i++){
                        if(sortedItemByGenre[i].length != 0) {
                            sortedItemByGenre[i].sort((prev, next) => {
                                return prev.index - next.index;
                            })
                        }
                    }
                    
                    // 별점 셋팅
                    // Initialize rating of each favorite movie
                    let idx = 0;
                    console.log('함수 안에서의 page?: ' + page);
                    console.log('page*20?' + page*20);
                    for(let i=0; i<18; i++){
                        for(let j=0; j<page*20; j++){
                            if(sortedItemByGenre[i].length > idx && sortedItemByGenre[i][idx].index === j) {
                                replaced_rating[i].push({stars: sortedItemByGenre[i][idx].rating});
                                idx++;
                            }
                            else{
                                replaced_rating[i].push({stars: 0})
                            }
                        }
                        idx=0;
                    }
                    
                    that.rating = replaced_rating;
                    store.dispatch(actions.set_favorite_rating(replaced_rating));
                }))
        })
    }
    
    empty() {
        new Promise((resolve, reject) => {
            resolve(store.dispatch(actions.remove_rating()));
        }).then(() => {
            store.dispatch(actions.removeMovies_API());
        })
    }
    
    movieFromAPIServer(page, genre) {
        let data = {};
        new Promise((resolve, reject) => {
            resolve($.ajax({
                url: 'https://api.themoviedb.org/3/discover/movie?api_key=' + KEY + 
                    '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + 
                    page + '&with_genres=' + genre,
                type: 'GET',
                success: function(result) {
                    data = result.results;
                },
                error: function(err) {
                    console.error(err);
                }
            }))
        })
        .then(() => {
            return store.dispatch(actions.nextPage());
        })
        .then(() => {
            data.map((data, i) => {
                let state = {};
                state.original_title = data.original_title;
                state.overview = data.overview;
                state.release_date = data.release_date;
                state.vote_arrange = data.vote_average;
                state.vote_count = data.vote_count;
                state.poster_path = "http://image.tmdb.org/t/p/w185/" + data.poster_path;
                state.popularity = data.popularity;
                
                store.dispatch(actions.storeMovies_API(state));
            });
        })
        .catch(() => console.log.bind(console));
    }
    
}
 
export default API_Funcs;