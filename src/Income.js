import React, { Component } from 'react';
import './App.css';
import ListIncomes from "./queries/ListIncomes";
import CreateIncome from "./mutations/CreateIncome"
import ListTypeIns from "./queries/ListTypesIn";
import Income_table from "./components/Income_table"
import DeleteIncome from "./mutations/DeleteIncome"
import {compose, graphql} from "react-apollo/index";
import Hmenu from "./Menu";
import  uuidV4 from 'uuid/v4'
class Income extends Component {
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
    addIncome=()=>{
        var typename=this.state.typename
        if(typename=="0"){
            typename=this.props.typeins.filter(list=>list.name==this.state.username)[0].typename
        }
        this.props.onAddIncome({
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
            const removeId=this.props.incomes.filter(list=>list.username==this.state.username)[index].id
            this.props.onDeleteIncome({id: removeId})
    }
    remove_search=(event)=>{
        const index=event.target.name;
        const removeId=this.state.data[index].id
        this.state.data.splice(index,1)
        this.props.onDeleteIncome({id: removeId})
    }
    cal_amount=()=>{
        this.setState({flag: '1'})
        var amount=0;
        var data=[];
        var startTime = new Date(Date.parse(document.getElementsByName("from")[0].value));
        var endTime = new Date(Date.parse(document.getElementsByName("to")[0].value));
        this.props.incomes.filter(list=>list.username==this.state.username).map((item)=>{
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
                                        {this.props.typeins.filter(list=>list.name==this.state.username).map((item,index)=>{
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
                                    <td>Income</td>
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
                                    <td><button onClick={this.addIncome}>Add
                                    </button></td>
                                </tr>
                        </tbody>
                    </table><br/>
                    {this.state.flag=='0'&&<Income_table
                        data={this.props.incomes.filter(list => list.username == this.state.username)}
                        remove={this.remove}
                    />}
                    {this.state.flag=='1'&&<Income_table
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
    graphql(ListIncomes,{
        options: {
            fetchPolicy: 'cache-and-network'
        },
        props: props=>({
            incomes: props.data.listIncomes ? props.data.listIncomes.items:[]
        })
    }),
    graphql(CreateIncome,{
        props: props => ({
            onAddIncome: income => props.mutate({
                variables: income,
                optimisticResponse: {
                    _typename: "Mutation",
                    createIncome: {...income,__typename: 'Income'}
                },
                update: (proxy, {data: {createIncome}}) => {
                    const data = proxy.readQuery({query: ListIncomes})
                    data.listIncomes.items.push(createIncome)
                    proxy.writeQuery({query: ListIncomes, data})
                }
            })
        })
    }),
    graphql(DeleteIncome,{
        props: props => ({
            onDeleteIncome: post => props.mutate({
                variables: {id: post.id},
                optimisticResponse: {
                    __typename: "Mutation",
                    deleteIncome: {...post,__typename: 'Income'}
                },

                update: (proxy, {data: {deleteIncome:{id}}}) => {
                    const data = proxy.readQuery({query: ListIncomes})
                    data.listIncomes.items=data.listIncomes.items.filter(post=>post.id!==id)
                    proxy.writeQuery({query: ListIncomes, data})
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
)(Income);