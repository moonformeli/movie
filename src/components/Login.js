import React from 'react';
import update from 'react-addons-update';
import 'whatwg-fetch';
import $ from 'jquery';

import '../../public/styles/login.css';

class Login extends React.Component {
  
    constructor() {
      super();
      
      this.login = this.login.bind(this);
      this.signUp = this.signUp.bind(this);
      this.handleChange_login = this.handleChange_login.bind(this);
      this.handleChange_signup = this.handleChange_signup.bind(this);
      this.handleToggle = this.handleToggle.bind(this);
    }
    
    componentWillMount() {
        this.setState({
            isLoading: false,
            username: '',
            password: '',
            mode: 'Login',
            signUpId: '',
            signUpPw: ''
        });
    }
    
    handleChange_login(e) {
      let userInfo = {};
      userInfo[e.target.name] = e.target.value;
      this.setState(userInfo);
    }
    
    handleChange_signup(e) {
      let userInfo = {};
      userInfo[e.target.name] = e.target.value;
      this.setState(userInfo);
    }
    
    handleToggle() {
        if(this.state.mode === 'SignUp')
            this.setState({
                mode: 'Login',
                username: '',
                password: ''
            });
        else if(this.state.mode === 'Login')
            this.setState({
                mode: 'SignUp',
                signUpId: '',
                signUpPw: ''
            });
    }
    
    login(e) {
      e.preventDefault();
      this.setState({ isLoading: true });
      let user = {};
      user.id = this.state.username;
      user.pw = this.state.password;
      
      fetch('https://moon-test-heroku.herokuapp.com/users/list', {
        method: 'GET',
      })
      .then((response) => response.json())
      .then((data) => {
        return (data.map((item, i) => {
          if(user.id === item.id && user.pw === item.pw) {
            console.log('yes');
            this.setState({ isLoading: false });
          }
        }));
      })
      .then(() => {
        if(this.state.isLoading === true) {
          this.setState({ isLoading: false, password: '' });
          //console.log('로그인성공');
          //localStorage.setItem('loginId', user.id);
        }else{
          localStorage.setItem('loginId', user.id);
          window.location.href="/";
        }
      })
      .catch(function(error) {console.error(error)});
    }
    
    signUp(e) {
      e.preventDefault();
      this.setState({ isLoading: true });
      let user = {
        id: this.state.signUpId,
        pw: this.state.signUpPw
      };
      
      //Check if there's the same username that was already chosen
      let bool = false;
      
      $.ajax({
        url:'https://moon-test-heroku.herokuapp.com/users/list',
        type:'GET',
        success: function(data) {
          for(let i=0; i<data.length; i++) {
            if(data[i].id === user.id) {
              bool = true;
              break;
            }
          }
        },
        error: function(error) {
          console.error(error);
        }
      })
      .done(() => {
        console.log('아이디 중복?' + bool);
        if(!bool) {
          $.ajax({
            url: 'https://moon-test-heroku.herokuapp.com/users/signup',
            type: 'POST',
            data: user,
            error: function(error) {
              console.error(error);
            }
          })
          .done(() => this.setState({ mode: 'Login', isLoading: false }))
          .fail(() => this.setState({isLoading: false}));
        }else{
          this.setState({ isLoading: false });
        }
      })
      .done(() => {
          this.setState({
              signUpId: '',
              signUpPw: ''
          });
      });
    }
    
    render() {
        
        const SignUp = (
          <div className="container">
            <button className="back glyphicon glyphicon-menu-left" onClick={this.handleToggle}></button>
            <h1 className={this.state.isLoading === true ? 'isLoading' : null}>Creating a new account</h1>
            {this.state.isLoading === true ? <div className="spinner spinner-visible"></div> : <div className="spinner spinner-invisible"></div>}
            <form onSubmit={this.signUp} className={this.state.isLoading === true ? 'formFade' : null}>
                <label className={this.state.signUpId ? 'active' : null}>Username</label>
          			<input name="signUpId" type="text" value={this.state.signUpId} onChange={this.handleChange_signup} required/><br/>
          			<label className={this.state.signUpPw ? 'active' : null}>Password</label>
          			<input name="signUpPw" type="password" value={this.state.signUpPw} onChange={this.handleChange_signup} required/><br/>
          			<button type="submit" id="login-button">Sign Up</button>
            </form>
          </div>
        );
        
        const Login = (
          <div className="container">
            <h1 className={this.state.isLoading === true ? 'isLoading' : null}>Welcome</h1>
            {this.state.isLoading === true ? <div className="spinner spinner-visible"></div> : <div className="spinner spinner-invisible"></div>}
              <form onSubmit={this.login} className={this.state.isLoading === true ? 'formFade' : null}>
          			<input name="username" type="text" value={this.state.username} onChange={this.handleChange_login} placeholder="Username" />
          			<input name="password" type="password" value={this.state.password} onChange={this.handleChange_login} placeholder="Password" />
          			<button type="submit" id="login-button">Login</button>
              </form>
              <p className={this.state.isLoading === true ? 'pFade' : null}>아직 회원이 아니신가요? <span onClick={this.handleToggle}>회원가입</span></p>
          </div>  
        );
        
        return(
          <div className="wrapper">
            {this.state.mode === 'SignUp' ? SignUp : Login}
          </div>
        );
    }
    
}

export default Login;