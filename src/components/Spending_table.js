import React,{Component} from 'react';

class Spending_table extends Component
{
    render(){
        return (
            <table className="show_table">
                <thead>
                <tr>
                    <th>Item</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Amount</th>
                    {this.props.remove!='0'&&<th></th>}
                </tr>
                </thead>
                <tbody>
                {
                    this.props.data.map((row,index)=>(
                        <tr key={index}>
                            <td>{row.name}</td>
                            <td>{row.type}</td>
                            <td>{row.date}</td>
                            <td>{row.amount}</td>
                            {this.props.remove!='0'&&<td><button className="buttonD" name={index} onClick={this.props.remove}>Delete</button></td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }
}


export default Spending_table;