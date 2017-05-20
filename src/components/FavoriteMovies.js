import { SpringGrid  } from 'react-stonecutter';
import React from 'react';
import { store } from '../index';
import { connect } from 'react-redux';
import ReactStars from 'react-stars';
import ReactTooltip from 'react-tooltip';
import $ from 'jquery';

import '../../public/styles/FavoriteMovies.css';
import API_Funcs from '../resources/API_Funcs';

const propTypes = {
    favoriteMovies: React.PropTypes.object
};

const defaultProps = {
    favoriteMovies: {}
};

class FavoriteMovies extends React.Component {
    
    constructor(){
        super();
        this.state = {
            movieData: {
                movies: []
            }
        }
        
        this.loadData = this.loadData.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }
    
    /* 
       ======================
       Component Life Cycle Methods
       ======================
    */
    componentDidMount() {
        this.loadData();
        this.setState({ movieData: this.props.favoriteMovies });
    }
    
    /* 
       ======================
       Custom Methods
       ======================
    */
    loadData() {
        let funcs = new API_Funcs();
        
        funcs.favoriteMovies();
    }
    
    removeItem(data) {
        let nextState = {
            username: localStorage.getItem('loginId'),
            title: data.title
        };
        $.post('https://moon-test-heroku.herokuapp.com/favorite/deleteOne', nextState, function(result, stats){
            console.log(result);
        })
        .done(this.loadData());
    }
    
    render(){
        
        const ratingChanged = (newRating, i, data) => {
            // let funcs = new API_Funcs();
            // funcs.ratingChanged(newRating, this.props.pointer, i, data);
            let state = {
                username: localStorage.getItem('loginId'),
                title: data.title,
                newRating: newRating
            };
            
            $.post('https://moon-test-heroku.herokuapp.com/update/favorite/movie', state, function(result, stats){
                console.log('Update is done, ' + JSON.stringify(result));
            })
        }
        
        const mouseOver = (i) => {
            console.log(i);
            $(`#cover-${i}`).removeClass('no-show');
        }
        
        const mouseLeave = (i) => {
            $(`#cover-${i}`).addClass('no-show');
        }
        
        const movieLists = this.props.favoriteMovies.movies.map((data, i) => {
            return (
                <li key={`img-${i}-${data.title}`}>
                    <div onMouseOver={() => mouseOver(i)} onMouseLeave={() => mouseLeave(i)} onClick={() => this.removeItem(data)}>
                        <img
                            // data-tip
                            // data-for={`img-${i}`}
                            className="img-rounded"
                            src={data.img}
                        /> 
                        <div className="rating">
                            <ReactStars
                                iKey={i}
                                data={data}
                                value={data.rating}
                                count={5}
                                onChange={ratingChanged}
                                size={24}
                                color2={'#ffd700'}
                            />
                        </div>
                        <div id={`cover-${i}`} className="cover no-show" >
                            <div className="del-label">
                                <p>삭제하려면</p>
                                <p>클릭하세요</p>
                            </div>
                        </div>
                    </div>
                </li>
            );
        });
        
        return(
            <div>
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
            </div>
        );
    }
    
}

FavoriteMovies.propTypes = propTypes;
FavoriteMovies.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        pointer: state.aboutAPIs.pointer,
        favoriteMovies: state.aboutFavorite.movieData
    }
}

FavoriteMovies = connect(mapStateToProps,undefined)(FavoriteMovies);

export default FavoriteMovies;