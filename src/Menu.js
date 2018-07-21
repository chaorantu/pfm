import React,{Component} from 'react';
import {Link} from 'react-router-dom';
class Hmenu extends Component{
    constructor(props){
        super(props);
    }

    render(){
        console.log(this.props.id)
        return (
            < div className = "new" >
            <ul>
                <label>Welcome <br/>{this.props.name} !</label>

            <li>
                <Link to={{
                    pathname:`/user/${this.props.id}`,state: {
                        id: this.props.id,
                        name: this.props.name
                    }
                }}>Main</Link>
            </li>
            <li>
                <Link  to={{
                    pathname:`/user/${this.props.id}/category`,state: {
                        id: this.props.id,
                        name: this.props.name
                    }
                }}>Category Management</Link>
            </li>
            <li>
                <Link  to={{
                    pathname:`/user/${this.props.id}/income`,state: {
                        id: this.props.id,
                        name: this.props.name
                    }
                }}>income Management</Link>
            </li>
            <li>
                <Link  to={{
                    pathname:`/user/${this.props.id}/spending`,state: {
                        id: this.props.id,
                        name: this.props.name
                    }
                }}>spending Management</Link>
            </li>
            <li>
                <Link to={{
                    pathname:`/`,
                }}>Sign Out</Link>
            </li>
            </ul>
            </div>
        );
    }
}
Hmenu.propTypes = {
};
export default Hmenu;