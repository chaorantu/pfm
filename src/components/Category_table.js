import React,{Component} from 'react';

class Category_table extends Component
{

    render(){
        return (
            <table className="type_table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {
                    this.props.data.map((row,index)=>(
                        <tr key={index}>
                            {this.props.flag=='0'&&<td>income</td>}
                            {this.props.flag=='1'&&<td>spending</td>}
                            <td>{row.typename}</td>
                            <td><button className="buttonD" name={index} onClick={this.props.remove}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
}
}


export default Category_table;
