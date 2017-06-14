import {aboutAPIs, aboutFavorite, aboutRecommendation} from './aboutAPIs';
import { combineReducers } from 'redux';

const reducers = combineReducers({aboutAPIs, aboutFavorite, aboutRecommendation});

export default reducers;