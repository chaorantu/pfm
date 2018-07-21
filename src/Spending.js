import React, { Component } from 'react';
import './App.css';
import ListSpendings from "./queries/ListSpendings";
import CreateSpending from "./mutations/CreateSpending"
import ListTypeOuts from "./queries/ListTypesOut";
import DeleteSpending from "./mutations/DeleteSpending"
import {compose, graphql} from "react-apollo/index";
import Hmenu from "./Menu";
import  uuidV4 from 'uuid/v4'
import Spending_table from "./components/Spending_table";
class Spending extends Component {
    state={
        id:'',
        username: '',
        typename: '0',
        name: '',
        date: '',
        amount:'',
        total:'',
        data:'',
        flag:'0',
    }
    typenameChange=(e)=>{
        this.setState({typename: e.target.value});
    }
    nameChange=(e)=>{
        this.setState({name: e.target.value})
    }
    dateChange=(e)=>{
        this.setState({date: e.target.value})
    }
    amountChange=(e)=>{
        this.setState({amount: e.target.value})
    }
    componentDidMount = async() => {
        const title = this.props.location.state;
        this.setState({id: this.props.location.state.id});
        this.setState({username: this.props.location.state.name});
    }
    addSpending=()=>{
        var typename=this.state.typename
        if(typename=="0"){
            typename=this.props.typeouts.filter(list=>list.name==this.state.username)[0].typename
        }
        this.props.onAddSpending({
            id:uuidV4(),
            username:this.state.username,
            type: typename,
            name: this.state.name,
            date: this.state.date,
            amount: parseFloat(this.state.amount),
        })
        this.setState({
            name: '',
            date: '',
            amount: '',
        })
    }
    remove=(event)=>{
        const index=event.target.name;
        const removeId=this.props.spendings.filter(list=>list.username==this.state.username)[index].id
        this.props.onDeleteSpending({id: removeId})
    }
    remove_search=(event)=>{
        const index=event.target.name;
        const removeId=this.state.data[index].id
        this.state.data.splice(index,1)
        this.props.onDeleteSpending({id: removeId})
    }
    cal_amount=()=>{
        this.setState({flag: '1'})
        var amount=0;
        var data=[];
        var startTime = new Date(Date.parse(document.getElementsByName("from")[0].value));
        var endTime = new Date(Date.parse(document.getElementsByName("to")[0].value));
        this.props.spendings.filter(list=>list.username==this.state.username).map((item)=>{
            var currTime=new Date(Date.parse(item.date))
            if(currTime>=startTime&&currTime<=endTime){
                amount=amount+item.amount
                const len=data.length
                data.splice(len+1,0,item)
            }
        })
        this.setState({total: amount})
        this.setState({data: data})
    }
    close_filter=()=>{
        this.setState({flag:'0'})
    }
    render(){
        return(

            <div className="App">
                <div className="left_side">
                    <Hmenu
                        id={this.state.id}
                        name={this.state.username}
                    />
                </div>
                <div className="content">
                    <table className="text_table">
                        <tbody>
                        <tr >
                            <td>Select a type:</td>
                            <td><select value={this.state.typename} onChange={this.typenameChange}>
                                {this.props.typeouts.filter(list=>list.name==this.state.username).map((item,index)=>{
                                    return <option key={index}>{item.typename}</option>
                                })}
                            </select></td>
                        </tr>
                        <tr>
                            <td>Enter the name:</td>
                            <td><input type="text" value={this.state.name} onChange={this.nameChange}>
                            </input></td>
                        </tr>
                        <tr>
                            <td>Category:</td>
                            <td>Spending</td>
                        </tr>
                        <tr>
                            <td>Enter the date:</td>
                            <td><input type="date" value={this.state.date} onChange={this.dateChange}>
                            </input></td>
                        </tr>
                        <tr>
                            <td>Enter the amount:</td>
                            <td><input type="text" value={this.state.amount} onChange={this.amountChange}>
                            </input></td>
                        </tr>
                        <tr>
                            <td>Confirm:</td>
                            <td><button onClick={this.addSpending}>Add
                            </button></td>
                        </tr>
                        </tbody>
                    </table><br/>
                    {this.state.flag=='0'&&<Spending_table
                        data={this.props.spendings.filter(list => list.username == this.state.username)}
                        remove={this.remove}
                    />}
                    {this.state.flag=='1'&&<Spending_table
                        data={this.state.data}
                        remove={this.remove_search}
                    />}
                    <br/>
                    <label>From</label>&ensp; <input type="date" name="from"/>&ensp;
                    <label>To</label>&ensp; <input type="date" name="to"/>&ensp;
                    <button onClick={this.cal_amount}>Search</button>&ensp;
                    <label>Total Amount:</label>
                    <input type="text" value={this.state.total} readOnly="true"/>
                    <button className="buttonD" onClick={this.close_filter}>Clear Filter</button>
                </div>
            </div>
        );
    }
}

export default compose(
    graphql(ListSpendings,{
        options: {
            fetchPolicy: 'cache-and-network'
        },
        props: props=>({
            spendings: props.data.listSpendings ? props.data.listSpendings.items:[]
        })
    }),
    graphql(CreateSpending,{
        props: props => ({
            onAddSpending: spending => props.mutate({
                variables: spending,
                optimisticResponse: {
                    _typename: "Mutation",
                    createSpending: {...spending,__typename: 'Spending'}
                },
                update: (proxy, {data: {createSpending}}) => {
                    const data = proxy.readQuery({query: ListSpendings})
                    data.listSpendings.items.push(createSpending)
                    proxy.writeQuery({query: ListSpendings, data})
                }
            })
        })
    }),
    graphql(DeleteSpending,{
        props: props => ({
            onDeleteSpending: post => props.mutate({
                variables: {id: post.id},
                optimisticResponse: {
                    __typename: "Mutation",
                    deleteSpending: {...post,__typename: 'Spending'}
                },

                update: (proxy, {data: {deleteSpending:{id}}}) => {
                    const data = proxy.readQuery({query: ListSpendings})
                    data.listSpendings.items=data.listSpendings.items.filter(post=>post.id!==id)
                    proxy.writeQuery({query: ListSpendings, data})
                }
            })
        })
    }),
    graphql(ListTypeOuts,{
        options: {
            fetchPolicy: 'cache-and-network'
        },
        props: props=>({
            typeouts: props.data.listTypeOuts ? props.data.listTypeOuts.items:[]
        })
    }),
)(Spending);