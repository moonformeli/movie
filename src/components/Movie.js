import React from 'react';
import { SpringGrid  } from 'react-stonecutter';
import ReactStars from 'react-stars';
import ReactTooltip from 'react-tooltip';
import $ from 'jquery';
import { connect } from 'react-redux';
import * as actions from '../actions';

import API_Funcs from '../resources/API_Funcs';
import * as RESOURCES from '../resources/API_KEY';
import '../../public/styles/Movies.css';

const defaultProps = {};

const propTypes = {};

class Movies extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
          data: {},
          genre: 28
        };
        
        this.loadMoreData = this.loadMoreData.bind(this);
    }
    
    /*componentWillMount() {
        
    }*/
    
    //GET API Data
    
    componentDidMount() {
        this.loadMoreData();
        $.post('https://moon-test-heroku.herokuapp.com/findUser/favorite/movie', {id: localStorage.getItem('loginId')}, function(data, status){
            for(let i=0; i<data.movies.length; i++) {
            }
        });
    }
    
    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(nextProps.genre) != JSON.stringify(this.props.genre)){
            this.props.fetchData('https://api.themoviedb.org/3/discover/movie?api_key=' + RESOURCES.KEY + 
                '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + 
                this.props.page[this.props.currentIndex].page + '&with_genres=' + nextProps.genre);
        }
    }
    
    componenWillUpdate(nextProps, nextState) {
        //this.getMovieLists();
        console.log('This means shouldComponentUpdate default value is true');
    }
    
    handleMouseOver(data){
        this.setState({
            data: data
        });
    }
    
    loadMoreData() {
        let funcs = new API_Funcs();
        funcs.movieFromServer(this.props.page[this.props.currentIndex].page, this.props.genre);
    }
    
    render() {
        
        const ratingChanged = (newRating, i, data) => {
            let state = {
                id: localStorage.getItem('loginId'),
                title: data.original_title,
                rating: newRating,
                img: data.poster_path,
                genre: this.props.currentIndex,
                index: i,
                isThisFirstTimeToMakeId: true
            };
            console.log('genre:' + state.genre);
            
            
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
            .done(() => this.props.loadData());
        };
        
        const movieLists = this.props.movieData[this.props.currentIndex].map((data, i) => {
            return (
                <li key={`img-${i}-${data.original_title}`}>
                    <img
                        data-tip
                        data-for={`img-${i}`}
                        className="img-rounded test"
                        onMouseOver={this.handleMouseOver.bind(this, data)}
                        src={data.poster_path}
                    />
                    <div className="rating">
                        <ReactStars
                            iKey={i}
                            data={data}
                            //value={this.props.movieData[this.props.currentIndex][i].rating}
                            //value={this.props.rating[this.props.currentIndex][i].stars}
                            count={5}
                            //onChange={ratingChanged}
                            size={24}
                            color2={'#ffd700'}
                        />
                    </div>
                    <ReactTooltip id={`img-${i}`}>
                        <p><span className="tip glyphicon glyphicon-eye-open" aria-hidden="true"> {this.state.data.vote_count * 4}</span></p>
                        <p><span className="tip glyphicon glyphicon-heart" aria-hidden="true"> {this.state.data.vote_arrange}</span></p>
                    </ReactTooltip>
                </li>
            );
        });
        
        return(
            <div className="container">
                    <SpringGrid 
                        component="ul"
                        columns={4}
                        columnWidth={200}
                        gutterWidth={10}
                        gutterHeight={200}
                        itemHeight={150}
                        springConfig={{ stiffness: 170, damping: 26 }}
                    >
                        {movieLists}
                    <button className="btn myBtn" onClick={() => this.loadMoreData()}>더 많은 영화보기</button>
                    </SpringGrid >
            </div>
        );
    }
}

Movies.propTypes = propTypes;
Movies.defaultProps = defaultProps;

let mapStateToProps = (state) => {
    return {
        movieData: state.aboutAPIs.movieData,
        currentIndex: state.aboutAPIs.currentIndex,
        page: state.aboutAPIs.page,
        genre: state.aboutAPIs.genre
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(actions.moviesFromAPI(url))
    };
}

Movies = connect(mapStateToProps, mapDispatchToProps)(Movies);

export default Movies;