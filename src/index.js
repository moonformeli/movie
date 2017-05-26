import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import App from './App';
import Home from './containers/Home';
//import About from './containers/About';
import Posts from './containers/Posts';
import Login from './components/Login';
import Movie from './components/Movie';
import FavoriteMovies from './components/FavoriteMovies';

import './index.css';

const store = createStore(reducers, applyMiddleware(thunk));

export {store};

class Routing extends React.Component {
  render() {
    return (
      
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="movie/">
          <Route path="choose" component={Movie}/>
          <Route path="favorite" component={FavoriteMovies}/>
        </Route>
        <Route path="post" component={Posts}/>
      </Route>
    </Router>  
    
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    {/*{localStorage.getItem('loginId') ? <Routing /> : <Login />}*/}
    {localStorage.getItem('loginId') ? <App /> : <Login />}
  </Provider>,
  document.getElementById('root')
);