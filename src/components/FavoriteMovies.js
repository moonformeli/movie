import { SpringGrid  } from 'react-stonecutter';
import React from 'react';

class FavoriteMovies extends React.Component {
    
    constructor(){
        super();
    }
    
    render(){
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
                        <button className="btn myBtn" onClick={() => this.loadMoreData('load more data')}>더 많은 영화보기</button>
                        </SpringGrid >
                </div>
            </div>
        );
    }
    
}

export default FavoriteMovies;