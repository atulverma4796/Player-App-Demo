import React,{Component} from "react";
import {Route,Switch,Redirect} from "react-router-dom";
import NavbarT2 from "./navbarT2";
import StarsT2 from "./starsT2";
import StarT2 from "./starT2";
import AddStar from "./addStar";
class MainComponent extends Component{
    state={
        player:["All","Cricket","Football"],
    };
    render(){
        const{player}=this.state;
        return (<div className="container">
        <NavbarT2 player={player}/>
        <Switch>
        <Route path="/star/new" component={AddStar}/>
        <Route path="/stars/:value" component={StarsT2}/>
        <Route path="/details/:id" component={StarT2}/>
        <Redirect from="/" to="/"/>
        </Switch>
        </div>);
    }
}
export default MainComponent;