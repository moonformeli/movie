import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import App from './App';
import Home from './containers/Home';
//import About from './containers/About';
import Posts from './containers/Posts';
import Login from './components/Login';
import Movie from './components/Movie';

import './index.css';

class Routing extends React.Component {
  render() {
    return (
      
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}/>
        <Route path="movie/">
          <Route path="choose" component={Movie}/>
        </Route>
        <Route path="post" component={Posts}/>
      </Route>
    </Router>  
    );
  }
}

ReactDOM.render(
  <Provider>
    {localStorage.getItem('loginId') ? <Routing /> : <Login />}
  </Provider>,
  document.getElementById('root')
);