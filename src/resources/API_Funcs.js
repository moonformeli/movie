import $ from 'jquery';
import * as actions from '../actions';
import {store} from '../index';
import React from 'react';

const KEY = "268d70c982dabbd56d9db882a7112594";

class API_Funcs{
    
    constructor() {
        rating:[
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]  
            ];
    }
    
    favoriteMovies_EachUser() {
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
                    for(let i=0; i<sortedItemByGenre.length; i++) {
                        for(let j=0; j<sortedItemByGenre[i].length; j++) {
                            while(idx < sortedItemByGenre[i][j].index){
                                replaced_rating[i].push({stars:0});
                                idx++;
                            }
                            replaced_rating[i].push({stars: sortedItemByGenre[i][j].rating});
                            idx++;
                        }
                        idx = 0;
                    }
                    that.rating = replaced_rating;
                }))
        })
        /*$.post('https://moon-test-heroku.herokuapp.com/findUser/favorite/movie', {id: localStorage.getItem('loginId')}, function(data, status){
            return data;
        });*/
        /*
        $.post('https://moon-test-heroku.herokuapp.com/favorite/movie/' + localStorage.getItem('loginId'), {}, function(data, status){
            return data;
        });*/
    }
    
    test(seconds) {
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(console.log('arg:' + seconds)), seconds);
        })
    }
    
    movieFromAPIServer(page, genre) {
        let rating= [
            [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]  
        ];
        let data = {name:1};
        
        this.favoriteMovies_EachUser()
        .then(() => {
            store.dispatch(actions.remove_rating());
        })
        .then(() => {
            store.dispatch(actions.set_favorite_rating(this.rating));
        })
        .then(() => {
            store.dispatch(actions.moviesFromAPI('https://api.themoviedb.org/3/discover/movie?api_key=' + KEY + 
            '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + 
            page + '&with_genres=' + genre));
        })
        .then(() => console.log('생성자를 통한 접근:' + JSON.stringify(this.rating)));
        
        /*
        new Promise((resolve, reject)=> {
            resolve('시작')
        })
        .then(() => {
            return store.dispatch(actions.moviesFromAPI('https://api.themoviedb.org/3/discover/movie?api_key=' + KEY + 
            '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + 
            page + '&with_genres=' + genre));
        })
        .then(() => {
            //return data = this.favoriteMovies_EachUser();
            // return this.favoriteMovies_EachUser();
            return console.log(this.favoriteMovies_EachUser().PromiseValue);
        })
        .then(() => {
            return () => {
                setTimeout(() => {}, 3000);
                console.log('결과는?:' + JSON.stringify(data))
            }
        })*/
        
    }
    
}
 
export default API_Funcs;