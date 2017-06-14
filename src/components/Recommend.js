import React from 'react';
import { SpringGrid  } from 'react-stonecutter';
import ReactTooltip from 'react-tooltip';
import { connect } from 'react-redux';
import $ from 'jquery';
import {store} from '../index';
import * as actions from '../actions';

import Movie from './Movie';
import API_Funcs from '../resources/API_Funcs';
import '../../public/styles/Recommendation.css';

const defaultProps = {
    favoriteMovies: {},
    recommendation: []
};

const propTypes = {
    favoriteMovies: React.PropTypes.object,
    recommendation: React.PropTypes.array
};

class Recommend extends React.Component {
    
    constructor(){
        super();
        this.state = {
            pickedMovies: [],
            renderMovie: false
        }
        
        this.recommendation = this.recommendation.bind(this);
        this.loadData = this.loadData.bind(this);
        this.randomRange = this.randomRange.bind(this);
        this.distinct = this.distinct.bind(this);
        this.emptyAndLoad = this.emptyAndLoad.bind(this);
        this.goToMovie = this.goToMovie.bind(this);
    }
    
    /* Components life cycle */
    
    componentDidMount(){
        this.setState({ renderMovie:false });
        this.loadData();
    }
    
    /* custom methods */
    
    recommendation() {
        let pickedFavMovies = [];
        let bool = true;
        let i = 0;
        
        /*for(let i=0; i<this.props.favoriteMovies.movies.length; i++) {
            pickedMovies[i] = this.props.favoriteMovies.movies[i].movieID;    
        }*/
        while(bool) {
            pickedFavMovies[i] = this.props.favoriteMovies.movies[this.randomRange(0, this.props.favoriteMovies.movies.length - 1)].movieID;
            if(i===10) bool = false;
            else i++;
        }
        
        let funcs = new API_Funcs();
        let rand = [];
        
        for(i=0; i<5; i++) {
            rand[i] = pickedFavMovies[this.randomRange(0, pickedFavMovies.length-1)];
            if(i>0){
                if(!this.distinct(rand)) i--;
            }
        }
        
        new Promise(resolve => resolve(funcs.getSimilarMovies(rand[0])))
        .then(() => {return funcs.getSimilarMovies(rand[1])})
        .then(() => {return funcs.getSimilarMovies(rand[2])})
        .then(() => {return funcs.getSimilarMovies(rand[3])})
        .then(() => {return funcs.getSimilarMovies(rand[4])});
        
        this.setState({pickedMovies: pickedFavMovies});
    }
    
    randomRange(n1, n2) {
        return Math.floor((Math.random() * (n2 - n1 + 1)) + n1);
    }
    
    distinct(arr) {
        for(let i=0; i<arr.length-1; i++) {
            if(arr[i] === arr[i+1]) return false;
        }
        return true;
    }
    
    loadData() {
        let funcs = new API_Funcs();
        
        new Promise(resolve => resolve(funcs.favoriteMovies()))
        .then(() => {return this.recommendation()});
    }
    
    emptyAndLoad() {
        store.dispatch(actions.emptyRecommendation());
        this.loadData();
    }
    
    goToMovie() {
        this.setState({ renderMovie:true });
    }
    
    render(){
        
        const movieLists = this.props.recommendation.map((data, i) => {
            return (
                <li key={`img-${i}-${data.original_title}`}>
                    <div>
                        <img
                            data-tip
                            data-for={`img-${i}`}
                            className="img-rounded"
                            src={'http://image.tmdb.org/t/p/w185/' + data.poster_path}
                        />
                    </div>
                    <ReactTooltip id={`img-${i}`} class="tip">
                        <p><span className="glyphicon glyphicon-eye-open" aria-hidden="true"> {data.vote_count * 64} </span></p>
                        <p><span className="glyphicon glyphicon-heart" aria-hidden="true"> {data.vote_average} </span></p>
                    </ReactTooltip>
                </li>
            );
        });
        
        const goToFavorite = () => {
            return(
                <div id="goToFavorite">
                    <img
                        className="recImg"
                        src="https://previews.123rf.com/images/nasirkhan/nasirkhan1207/nasirkhan120700085/14615603-3d-render-of-man-holding-oops-road-sign-3d-illustration-of-human-character-Stock-Illustration.jpg"
                        width="150"
                        height="198"
                    />
                    <h4>영화를 너무 적게 고르셨군요! 최소한 10개는 추천해주셔야 합니다.</h4>
                    <h4 className="h4-center">앞으로 <span><strong>{10 - this.props.favoriteMovies.movies.length}</strong></span> 개의 영화를 더 추천해주세요!</h4>
                </div>
            );
        }
        
        const showRecommendation = () => {
            return(
                <div id="rec-wrapper">
                    <div className="Grid-list left">
                            <SpringGrid 
                                component="ul"
                                columns={5}
                                columnWidth={200}
                                gutterWidth={10}
                                gutterHeight={200}
                                itemHeight={150}
                                springConfig={{ stiffness: 170, damping: 26 }}
                            >
                                {movieLists}
                            </SpringGrid >
                    </div>
                    <button className="btn myBtn recBtn" onClick={() => this.loadData()}>더 추천받기</button>
                    <button className="btn myBtn recBtn" onClick={() => this.emptyAndLoad()}>다시 추천받기</button>
                </div>
            );
        }
        
        return(
            <div>
                {this.props.favoriteMovies.movies.length < 10 ? goToFavorite() : showRecommendation()}
            </div>
        );
    }
    
}

Recommend.propTypes = propTypes;
Recommend.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return{
        favoriteMovies: state.aboutFavorite.movieData,
        recommendation: state.aboutRecommendation.recommendation
    }
}

Recommend = connect(mapStateToProps, undefined)(Recommend);

export default Recommend;