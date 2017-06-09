import React from 'react';
import { connect } from 'react-redux';

const defaultProps = {
    favoriteMovies: {}
};

const propTypes = {
    favoriteMovies: React.PropTypes.object
};

class Recommend extends React.Component {
    
    constructor(){
        super();
    }
    
    render(){
        return(
            <div>
                {JSON.stringify(this.props.favoriteMovies)}
            </div>
        );
    }
    
}

Recommend.propTypes = propTypes;
Recommend.defaultProps = defaultProps;

const mapStateToProps = (state) => {
    return{
        favoriteMovies: state.aboutFavorite.movieData
    }
}

Recommend = connect(mapStateToProps, undefined)(Recommend);

export default Recommend;