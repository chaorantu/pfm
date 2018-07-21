import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {compose,graphql} from 'react-apollo'
import  uuidV4 from 'uuid/v4'
import ListUsers from "./queries/ListUsers";
import CreateUser from "./mutations/CreateUser";


class Signup extends Component {
    state = {
        username: '',
        password: '',
        conpassword:'',
    }
    handleusername = (e) =>{
        this.setState({
            username: e.target.value,
        });
    }
    handlepassword = (e) =>{
        this.setState({password: e.target.value});
    }
    handleconpassword = (e) =>{
        this.setState({conpassword: e.target.value});
    }
    signup = () =>{
        if(this.state.password===this.state.conpassword) {
            if (this.signupcheck() === true) {
                this.props.onAdd({
                    id: uuidV4(),
                    username: this.state.username,
                    password: this.state.password,
                })
                this.setState({
                    id: '',
                    username: '',
                    password: '',
                })
                this.props.history.push(`/`)
            }
            else {
               alert("We are sorry,the username is taken")
            }
        }
        else{
            alert("Password doesn't match")
        }
    }
    signupcheck = () => {
        var flag = 1
        this.props.users.map((user)=>{
            if(this.state.username===user.username){
                flag=0;
            }
        });
        if(flag==1){
            return true;}
        else{return false;}
    }
    render() {
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
                <label>Confirm password: </label><br/>
                <input type="password" value={this.state.conpassword} maxLength="20" id="conpassword" onChange={this.handleconpassword}/><br/>
                <button type="button" onClick={this.signup}>Sign Up</button>
            </div>
        );
    }
}

export default compose(
    graphql(ListUsers,{
        options: {
            fetchPolicy: 'cache-and-network'
        },
        props: props=>({
            users: props.data.listUsers ? props.data.listUsers.items:[]
        })
    }),
    graphql(CreateUser,{
        props: props => ({
            onAdd: user => props.mutate({
                variables: user,
                optimisticResponse: {
                    _typename: "Mutation",
                    createUser: {...user,__typename: 'User'}
                },
                update: (proxy, {data: {createUser}}) => {
                    const data = proxy.readQuery({query: ListUsers})
                    data.listUsers.items.push(createUser)
                    proxy.writeQuery({query: ListUsers, data})
                }
            })
        })
    })
)(Signup);