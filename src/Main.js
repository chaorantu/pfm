import React, { Component } from 'react';
import './App.css';
import {compose, graphql} from "react-apollo/index";
import Hmenu from "./Menu";
import ListIncomes from "./queries/ListIncomes";
import ListSpendings from "./queries/ListSpendings";
import Income_table from "./components/Income_table"
import Spending_table from "./components/Spending_table";
class Main extends Component {
    state={
        id:'',
        username: '',
        typename: '0',
        total:'',
        dataincome:'',
        dataspending:'',
        flag:'0',
    }
    componentDidMount = async() => {
        const title = this.props.location.state;
        this.setState({id: this.props.location.state.id});
        this.setState({username: this.props.location.state.name});
    }
    cal_amount=()=>{
        this.setState({flag: '1'})
        var amount=0;
        var dataincome=[];
        var dataspending=[];
        var startTime = new Date(Date.parse(document.getElementsByName("from")[0].value));
        var endTime = new Date(Date.parse(document.getElementsByName("to")[0].value));
        this.props.incomes.filter(list=>list.username==this.state.username).map((item)=>{
            var currTime=new Date(Date.parse(item.date))
            if(currTime>=startTime&&currTime<=endTime){
                amount=amount+item.amount
                const len=dataincome.length
                dataincome.splice(len+1,0,item)
            }
        })
        this.props.spendings.filter(list=>list.username==this.state.username).map((item)=>{
            var currTime=new Date(Date.parse(item.date))
            if(currTime>=startTime&&currTime<=endTime){
                amount=amount-item.amount
                const len=dataspending.length
                dataspending.splice(len+1,0,item)
            }
        })
        this.setState({total: amount})
        this.setState({dataincome: dataincome})
        this.setState({dataspending: dataspending})
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
                    <div>
                    <div className="tab"><label>Income</label>
                    {this.state.flag=='0'&&<Income_table
                        data={this.props.incomes.filter(list => list.username == this.state.username)}
                        remove='0'
                    />}
                    {this.state.flag=='1'&&<Income_table
                        data={this.state.dataincome}
                        remove='0'
                    />}
                    </div>&ensp;&ensp;
                    <div className="tab"><label>Spending</label>
                    {this.state.flag=='0'&&<Spending_table
                        data={this.props.spendings.filter(list => list.username == this.state.username)}
                        remove='0'
                    />}
                    {this.state.flag=='1'&&<Spending_table
                        data={this.state.dataspending}
                        remove='0'
                    />}</div>
                    </div>
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
    graphql(ListSpendings,{
        options: {
            fetchPolicy: 'cache-and-network'
        },
        props: props=>({
            spendings: props.data.listSpendings ? props.data.listSpendings.items:[]
        })
    }),
)(Main);