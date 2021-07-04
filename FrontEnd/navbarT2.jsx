import React,{Component} from "react";
import {Link} from "react-router-dom";
class NavbarT2 extends Component{
    render(){
        return(
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">
               SportStar
                </Link>
                <div className="">
                    <ul className="navbar-nav mr-auto">
                       {this.props.player.map(v=><li className="nav-items" key={v}>
                       <Link className="nav-link" to={`/stars/${v}`}>
                       {v}</Link>
                       </li>)}
                       <li className="nav-item">
                            <Link className="nav-link" to="/star/new">
                                Add star
                            </Link>
                     </li>
                        
                    </ul>
                </div>
            </nav>
        )
    }
} 
export default NavbarT2;