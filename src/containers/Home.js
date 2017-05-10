import React from 'react';
import {store} from '../index';
import {removeMovies_API} from '../actions';

import BigText from '../components/BigText';

class Home extends React.Component {
    
    componentDidMount() {
        store.dispatch(removeMovies_API());
    }
    
    render() {
        return (
            <div>
                <BigText>홈</BigText>
            </div>
        );
    }
};

export default Home;