import React, { Component } from 'react';
import './App.css';
import ListTypeOuts from "./queries/ListTypesOut";
import CreateTypeOut from "./mutations/CreateTypeOut";
import DeleteTypeOut from "./mutations/DeleteTypeOut"
import ListTypeIns from "./queries/ListTypesIn";
import CreateTypeIn from "./mutations/CreateTypeIn";
import DeleteTypeIn from "./mutations/DeleteTypeIn"
import {compose, graphql} from "react-apollo/index";
import Hmenu from "./Menu";
import Category_table from "./components/Category_table"
import  uuidV4 from 'uuid/v4'
class Category extends Component {
    state={
        id:'',
        name: '',
        type: 'income',
        value: '',
        flag:'0',
    }
    handleChange=(event)=>{
        this.setState({type: event.target.value});
    }
    typeName=(event)=>{
        this.setState({value: event.target.value});
    }
    componentDidMount = async() => {
        const title = this.props.location.state;
        this.setState({id: this.props.location.state.id});
        this.setState({name: this.props.location.state.name});
    }
    tableChangeincome=()=>{
        this.setState({flag: '0'});
    }
    tableChangespend=()=>{
        this.setState({flag: '1'});
    }
    checkRe=(data)=>{
        const check=data.filter(list=>(list.typename==this.state.value&&list.name==this.state.name))
        const empty=data.filter(list=>list.name==this.state.name)
        if(empty==""){
            return true
        }
        else if(check==""){
            return true
        }
        else{
            return false
        }
    }
    addType=()=>{
            if (this.state.type == "income") {
                if(this.checkRe(this.props.typeins)===true) {
                    this.props.onAddTypeIn({
                        id: uuidV4(),
                        name: this.state.name,
                        typename: this.state.value,
                    })
                }
                else{
                    alert("please enter another type name")
                }
            }
            else {
                if(this.checkRe(this.props.typeouts)===true) {
                    this.props.onAddTypeOut({
                        id: uuidV4(),
                        name: this.state.name,
                        typename: this.state.value,
                    })
                }
                else{
                    alert("please enter another type name")
                }
            }
            this.setState({
                value: '',
            })
    }
    remove=(event)=>{
        const index=event.target.name;
        if(this.state.flag=='0'){
            const removeId=this.props.typeins.filter(list=>list.name==this.state.name)[index].id
            this.props.onDeleteTypeIn({id: removeId})
        }
        else{
            const removeId=this.props.typeouts.filter(list=>list.name==this.state.name)[index].id
            this.props.onDeleteTypeOut({id: removeId})
        }
    }

    render(){
        return(

            <div className="App">
                <div className="left_side">
                    <Hmenu
                        id={this.state.id}
                        name={this.state.name}
                    />
                </div>
                <div className="content">
                    <label>add income or spending:
                        <select value={this.state.type} onChange={this.handleChange}>
                            <option value="income">income</option>
                            <option value="spending">spending</option>
                        </select>
                    </label>
                    <input type="text" value={this.state.value}onChange={this.typeName}/>
                    <button type="button" onClick={this.addType}>Add Type</button>
                    <div>chosen: {this.state.type}</div>
                    <div>input: {this.state.value}</div>
                    <br/>
                    {this.state.flag=='0' && <Category_table
                        data={this.props.typeins.filter(list => list.name == this.state.name)}
                        remove={this.remove}
                        flag={this.state.flag}
                    />
                    }
                    {this.state.flag == '1' && <Category_table
                        data={this.props.typeouts.filter(list => list.name == this.state.name)}
                        remove={this.remove}
                        flag={this.state.flag}
                    />
                    }
                    <br/>
                    <button onClick={this.tableChangeincome}>Income</button>&ensp;
                    <button onClick={this.tableChangespend}>Spending</button>
                    <br/>
                </div>
            </div>
        );
    }
}

export default compose(
    graphql(ListTypeOuts,{
        options: {
            fetchPolicy: 'cache-and-network'
        },
        props: props=>({
            typeouts: props.data.listTypeOuts ? props.data.listTypeOuts.items:[]
        })
    }),
    graphql(CreateTypeOut,{
        props: props => ({
            onAddTypeOut: typeout => props.mutate({
                variables: typeout,
                optimisticResponse: {
                    _typename: "Mutation",
                    createTypeOut: {...typeout,__typename: 'TypeOut'}
                },
                update: (proxy, {data: {createTypeOut}}) => {
                    const data = proxy.readQuery({query: ListTypeOuts})
                    data.listTypeOuts.items.push(createTypeOut)
                    proxy.writeQuery({query: ListTypeOuts, data})
                }
            })
        })
    }),
    graphql(DeleteTypeOut,{
        props: props => ({
            onDeleteTypeOut: post => props.mutate({
                variables: {id: post.id},
                optimisticResponse: {
                    __typename: "Mutation",
                    deleteTypeOut: {...post,__typename: 'TypeOut'}
                },

                update: (proxy, {data: {deleteTypeOut:{id}}}) => {
                    const data = proxy.readQuery({query: ListTypeOuts})
                    data.listTypeOuts.items=data.listTypeOuts.items.filter(post=>post.id!==id)
                    proxy.writeQuery({query: ListTypeOuts, data})
                }
            })
        })
    }),
    graphql(ListTypeIns,{
        options: {
            fetchPolicy: 'cache-and-network'
        },
        props: props=>({
            typeins: props.data.listTypeIns ? props.data.listTypeIns.items:[]
        })
    }),
    graphql(CreateTypeIn,{
        props: props => ({
            onAddTypeIn: typein => props.mutate({
                variables: typein,
                optimisticResponse: {
                    _typename: "Mutation",
                    createTypeIn: {...typein,__typename: 'TypeIn'}
                },
                update: (proxy, {data: {createTypeIn}}) => {
                    const data = proxy.readQuery({query: ListTypeIns})
                    data.listTypeIns.items.push(createTypeIn)
                    proxy.writeQuery({query: ListTypeIns, data})
                }
            })
        })
    }),
    graphql(DeleteTypeIn,{
        props: props => ({
            onDeleteTypeIn: post => props.mutate({
                variables: {id: post.id},
                optimisticResponse: {
                    __typename: "Mutation",
                    deleteTypeIn: {...post,__typename: 'TypeIn'}
                },

                update: (proxy, {data: {deleteTypeIn:{id}}}) => {
                    const data = proxy.readQuery({query: ListTypeIns})
                    data.listTypeIns.items=data.listTypeIns.items.filter(post=>post.id!==id)
                    proxy.writeQuery({query: ListTypeIns, data})
                }
            })
        })
    })
)(Category);