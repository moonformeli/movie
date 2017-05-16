import React from 'react';
import { SpringGrid  } from 'react-stonecutter';
import ReactStars from 'react-stars';
import ReactTooltip from 'react-tooltip';
import $ from 'jquery';
import { connect } from 'react-redux';
import {store} from '../index';
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
            genre: 28,
            clickedNo: 0,
            rating: [
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]  
            ],
            movieData: []
        };
        
        this.loadMoreData = this.loadMoreData.bind(this);
        this.listItemClick = this.listItemClick.bind(this);
    }
    
    // ===============
    // Component Life Cycles
    // ===============
    
    componentWillMount() {
        let movies = {};
        $.post('https://moon-test-heroku.herokuapp.com/findUser/favorite/movie', {id: localStorage.getItem('loginId')}, function(data, status){
            movies = data.movies;
        });
        this.setState({ movieData: movies });
        // this.loadMoreData();
    }
    
    
    componentDidMount() {
        this.loadMoreData();
    }
    /*
    componentWillReceiveProps(nextProps){
    }*/
    /*
    shouldComponentUpdate(nextProps, nextState){
        if(JSON.stringify(nextProps.movieData) != JSON.stringify(this.props.movieData)) {
            console.log('다르다')
            return true;
        }else{
            console.log('같다')
            return false;
        }
    }*/
    
    /*componenWillUpdate(nextProps, nextState) {
        //this.getMovieLists();
        if(nextProps.movieData != this.props.movieData) {
            this.setState({ movieData: nextProps.movieData});
        }
        console.log('This means shouldComponentUpdate default value is true');
    }*/
    
    // ===============
    // Custom Methods
    // ===============
    
    handleMouseOver(data){
        this.setState({
            data: data
        });
    }
    
    listItemClick(genre, listIndex) {
        new Promise((resolve, reject) => resolve())
        .then(() => this.setState({clickedNo: listIndex}))
        .then(() => {
            let pointer = listIndex;
            store.dispatch(actions.set_selectedGenre(genre, pointer));
        })
        .then(() => console.log('여기는 찍히는가?'))
        .then(() => {
            this.loadMoreData();
        })
    }
     
    loadMoreData(msg) {
        let funcs = new API_Funcs();
        
        if(msg === undefined){
            new Promise(resolve => resolve(funcs.empty()))
            // .then(() => {return funcs.initialRating(this.props.movieData)})
            .then(() => {return funcs.initialRating(this.props.page[this.props.pointer].page)})
            .then(() => {return funcs.movieFromAPIServer(this.props.page[this.props.pointer].page, this.props.genre)})
        }else{
            new Promise(resolve => resolve(funcs.movieFromAPIServer(this.props.page[this.props.pointer].page, this.props.genre)))
            .then(() => {return funcs.initialRating(this.props.movieData)})
        }
        
        // let promise1 = new Promise(resolve => resolve(funcs.empty()));
        // let promise2 = new Promise(resolve => resolve(funcs.movieFromAPIServer(this.props.page[this.props.pointer].page, this.props.genre)));
        
        // let promises_init = () => {return new Promise(resolve => resolve(funcs.initialRating(this.props.movieData)));}
        // let promise_init = new Promise(resolve => resolve(funcs.initialRating(this.props.movieData)))
        
        // Promise.all([promise1, promise2])
        // .then(() => {return console.log('this.props.rating after promises: ' + JSON.stringify(this.props.rating))})
        // .then(() => {return promises_init()})
        // .all([promises_init()])
        // .then(() => {return console.log('this.props.rating after init :' + JSON.stringify(this.props.rating))})
        // .catch(err => console.error(err))
        
        // Promise.all([promise_init])
        // .then(() => {return console.log('this.props.rating from init: ' + JSON.stringify(this.props.rating))}) 
        
        // Promise.resolve(() => {return funcs.empty()})
        /*let a = () => {new Promise((resolve, reject) => {
            resolve(funcs.empty())
        })
        .then(() => {return console.log('this.props.rating after empty:' + JSON.stringify(this.props.rating))})
        .then(() => {return funcs.movieFromAPIServer(this.props.page[this.props.pointer].page, this.props.genre)})
        .then(() => {return funcs.initialRating(this.props.movieData)})
        .then(() => {return console.log('this.props.rating after init:' + JSON.stringify(this.props.rating))})
        .catch((err) => console.error(err))}
        
        a();*/
        
        /*let promise1 = () => {
            new Promise(resolve => resolve(funcs.empty()))
            .then(() => {return console.log('this.props.rating after empty:' + JSON.stringify(this.props.rating))})
        }
        
        Promise.all([promise1()])
            .then(() => {
                return new Promise(resolve => resolve(funcs.movieFromAPIServer(this.props.page[this.props.pointer].page, this.props.genre)))
            })
            .then(() => {
                return new Promise(resolve => resolve(funcs.initialRating(this.props.movieData)))
            })
            
        .then(() => {return console.log('this.props.rating after init:' + JSON.stringify(this.props.rating))})*/
        
        
    }
    
    render() {
        
        const ratingChanged = (newRating, i, data) => {
            let state = {
                id: localStorage.getItem('loginId'),
                title: data.original_title,
                rating: newRating,
                img: data.poster_path,
                genre: this.props.pointer,
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
            //.done(() => this.loadMoreData());
        };
        
        const movieLists = this.props.movieData[this.props.pointer].map((data, i) => {
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
                            //value={this.props.movieData[this.props.pointer][i].rating}
                            value={this.props.rating[this.props.pointer][i].stars}
                            count={5}
                            onChange={ratingChanged}
                            size={24}
                            color2={'#ffd700'}
                        />
                    </div>
                    <ReactTooltip id={`img-${i}`}>
                        <p><span className="tip glyphicon glyphicon-eye-open" aria-hidden="true"> {this.state.data.vote_count * 4} </span></p>
                        <p><span className="tip glyphicon glyphicon-heart" aria-hidden="true"> {this.state.data.vote_arrange} </span></p>
                    </ReactTooltip>
                </li>
            );
        });
        
        return(
            <div>
                <div className="left">
                    <ul id="movie_category">
                       <li className={this.state.clickedNo===0 ? 'li-clicked' : null} onClick={() => this.listItemClick(28, 0)}>액션</li>
                       <li className={this.state.clickedNo===1 ? 'li-clicked' : null} onClick={() => this.listItemClick(12, 1)}>어드밴쳐</li>
                       <li className={this.state.clickedNo===2 ? 'li-clicked' : null} onClick={() => this.listItemClick(16, 2)}>애니메이션</li>
                       <li className={this.state.clickedNo===3 ? 'li-clicked' : null} onClick={() => this.listItemClick(35, 3)}>코미디</li>
                       <li className={this.state.clickedNo===4 ? 'li-clicked' : null} onClick={() => this.listItemClick(80, 4)}>범죄</li>
                       <li className={this.state.clickedNo===5 ? 'li-clicked' : null} onClick={() => this.listItemClick(99, 5)}>다큐멘터리</li>
                       <li className={this.state.clickedNo===6 ? 'li-clicked' : null} onClick={() => this.listItemClick(18, 6)}>드라마</li>
                       <li className={this.state.clickedNo===7 ? 'li-clicked' : null} onClick={() => this.listItemClick(10751, 7)}>가족</li>
                       <li className={this.state.clickedNo===8 ? 'li-clicked' : null} onClick={() => this.listItemClick(14, 8)}>판타지</li>
                       <li className={this.state.clickedNo===9 ? 'li-clicked' : null} onClick={() => this.listItemClick(36, 9)}>역사</li>
                       <li className={this.state.clickedNo===10? 'clear li-clicked' : 'clear'} onClick={() => this.listItemClick(27, 10)}>호러</li>
                       <li className={this.state.clickedNo===11? 'li-clicked' : null} onClick={() => this.listItemClick(10402, 11)}>음악</li>
                       <li className={this.state.clickedNo===12? 'li-clicked' : null} onClick={() => this.listItemClick(9648, 12)}>미스테리</li>
                       <li className={this.state.clickedNo===13? 'li-clicked' : null} onClick={() => this.listItemClick(10749, 13)}>로맨스</li>
                       <li className={this.state.clickedNo===14? 'li-clicked' : null} onClick={() => this.listItemClick(878, 14)}>SF</li>
                       <li className={this.state.clickedNo===15? 'li-clicked' : null} onClick={() => this.listItemClick(10770, 15)}>TV 영화</li>
                       <li className={this.state.clickedNo===16? 'li-clicked' : null} onClick={() => this.listItemClick(53, 16)}>스릴러</li>
                       <li className={this.state.clickedNo===17? 'li-clicked' : null} onClick={() => this.listItemClick(10752, 17)}>전쟁</li>
                       <li className={this.state.clickedNo===18? 'li-clicked' : null} onClick={() => this.listItemClick(37, 18)}>서양문화</li>
                    </ul>
                </div>
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
                        <button className="btn myBtn" onClick={() => this.loadMoreData('load more data')}>더 많은 영화보기</button>
                        </SpringGrid >
                </div>
            </div>
        );
    }
}

Movies.propTypes = propTypes;
Movies.defaultProps = defaultProps;

let mapStateToProps = (state) => {
    return {
        movieData: state.aboutAPIs.movieData,
        pointer: state.aboutAPIs.pointer,
        page: state.aboutAPIs.page,
        genre: state.aboutAPIs.genre,
        rating: state.aboutAPIs.rating
    };
}

Movies = connect(mapStateToProps, undefined)(Movies);

export default Movies;