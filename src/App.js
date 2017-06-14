import React, {Component} from 'react';

import Home from './containers/Home';
import Movie from './components/Movie';
import FavoriteMovies from './components/FavoriteMovies';
import Recommend from './components/Recommend';
import Header from './components/Header';
import Posts from './containers/Posts';
import { Link } from 'react-router';
import logo from '../public/images/logo.png';

import './App.css';

class App extends Component {
    
    constructor(){
        super();
        this.state = {
            navIndex:0
        }
        
        this.menuToggle = this.menuToggle.bind(this);
        this.logOut = this.logOut.bind(this);
    }
    
    logOut(){
        localStorage.removeItem('loginId');
        window.location.href='/';
    }
    
    menuToggle(num) {
        console.log(num);
        this.setState({navIndex: num});
    }
    
    render() {
        /*return (
            <div>
                <Header/>
                {this.props.children}
            </div>
        );*/
        
        const menu = () => {
            console.log(this.state.navIndex);
            switch(this.state.navIndex){
                case 0:
                    return <Home />
                case 1:
                    return <Movie />
                case 2:
                    return <FavoriteMovies />
                case 3:
                    return <Recommend />
                default:
                    return;
            }
            
        }
        
        return(
            <div className="container-fluid">
                <nav id="nav" className="navbar navbar-default navbar-fixed-top">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <img className="navbar-brand nav-img" src={logo} onClick={() => this.menuToggle(0)}/>
                    </div>

                    <div className="collapse navbar-collapse pull-right nav-items" id="bs-example-navbar-collapse-1">
                      <ul className="nav navbar-nav">
                        <li className="active"><button className="nav-btn" onClick={() => this.menuToggle(0)}>home<span className="sr-only">(current)</span></button></li>
                        <li><button className="nav-btn" onClick={() => this.menuToggle(1)}>movies</button></li>
                        <li><button className="nav-btn" onClick={() => this.menuToggle(2)}>favorite</button></li>
                        <li><button className="nav-btn" onClick={() => this.menuToggle(3)}>recommend</button></li>
                        <li><button className="nav-btn" onClick={() => this.logOut()}>log out</button></li>
                      </ul>
                    </div>
                </nav>
                <div id="content-wrapper">
                    {menu()}
                </div>
            </div>
        );
    }
}

export default App;