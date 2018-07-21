import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {graphql} from 'react-apollo'
import ListUsers from "./queries/ListUsers";
import {Link} from "react-router-dom"

class App extends Component {
  state = {
      username: '',
      password: '',
  }
  handleusername = (e) =>{
      this.setState({
          username: e.target.value,
      });
  }
  handlepassword = (e) =>{
      this.setState({password: e.target.value});
  }
  signin = () =>{
      var id
      var name
      var flag='0'
      this.props.users.map((user)=>{
          if(this.state.username===user.username&&this.state.password===user.password){
              id=user.id
              name=user.username
              flag='1'
              this.props.history.push({
                  pathname:`/user/${id}`,
                      state: {id: id,
                              name: name
                             }
              });
          }
      });
      if(flag=='0'){
      alert("Invalid username or bad password.");}
  }
  render() {
      console.log(this.props)
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <label>Username: </label><br/>
          <input type="text" value={this.state.username} maxLength="20" id="username" onChange={this.handleusername}/><br/>
          <label>Password: </label><br/>
          <input type="password" value={this.state.password} maxLength="20" id="password" onChange={this.handlepassword}/><br/>
          <button type="button" onClick={this.signin}>Sign In</button><br/>
          <Link to={{
              pathname:`/signup`,
          }}>Sign Up</Link>
      </div>
    );
  }
}

export default
    graphql(ListUsers,{
    options: {
        fetchPolicy: 'cache-and-network'
    },
    props: props=>({
        users: props.data.listUsers ? props.data.listUsers.items:[]
    })
})
(App);
