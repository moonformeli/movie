import { SpringGrid  } from 'react-stonecutter';
import React from 'react';
import { store } from '../index';
import { connect } from 'react-redux';
import ReactStars from 'react-stars';
import ReactTooltip from 'react-tooltip';

import API_Funcs from '../resources/API_Funcs';

const propTypes = {};

const defaultProps = {};

class FavoriteMovies extends React.Component {
    
    constructor(){
        super();
        
        this.loadData = this.loadData.bind(this);
    }
    
    /* 
       ======================
       Component Life Cycle Methods
       ======================
    */
    componentDidMount() {
        this.loadData();
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
    
    render(){
        
        const movieLists = JSON.stringify(this.props.favoriteMovies.movies).map((data, i) => {
            return (
                <li key={`img-${i}-${data.original_title}`}>
                    <img
                        // data-tip
                        // data-for={`img-${i}`}
                        className="img-rounded test"
                        // onMouseOver={this.handleMouseOver.bind(this, data)}
                        src={data.poster_path}
                    /> 
                    {/*<div className="rating">
                        <ReactStars
                            iKey={i}
                            data={data}
                            //value={this.props.movieData[this.props.pointer][i].rating}
                            value={data.rating}
                            count={5}
                            // onChange={ratingChanged}
                            size={24}
                            color2={'#ffd700'}
                        />
                    </div>*/}
                    {/*<ReactTooltip id={`img-${i}`}>
                        <p><span className="tip glyphicon glyphicon-eye-open" aria-hidden="true"> {this.state.data.vote_count * 4} </span></p>
                        <p><span className="tip glyphicon glyphicon-heart" aria-hidden="true"> {this.state.data.vote_arrange} </span></p>
                    </ReactTooltip>*/}
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
                결과:{JSON.stringify(this.props.favoriteMovies.movies)}
            </div>
        );
    }
    
}

FavoriteMovies.propTypes = propTypes;
FavoriteMovies.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return {
        favoriteMovies: state.aboutFavorite.movieData
    }
}

FavoriteMovies = connect(mapStateToProps,undefined)(FavoriteMovies);

export default FavoriteMovies;