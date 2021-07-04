import React from "react";
export default class LeftPanelCB extends React.Component{
    makeCB=(arr,value,name,label)=>(
        <React.Fragment>
            <label className="font-weight-bold">{label}</label>
            {arr.map(v=><div className="form-check"key={v}>
                <input type="checkbox" className="form-check-input" name={name} value={v}
                checked={value.findIndex(a=>a===v)>=0} onChange={this.handleChange}/>
                <label className="form-check-label">{v}</label>
            </div>)}
        </React.Fragment>
    );
    handleChange=(e)=>{
        const{currentTarget:input}=e;
        let opt = {...this.props.option};
        opt[input.name]=this.updateCB(opt[input.name],input.checked,input.value);
        this.props.onOptionChange(opt);
    }
    updateCB=(inpVal,checked,value)=>{
        let inpArr = inpVal?inpVal.split(","):[];
        if(checked) inpArr.push(value);
        else{
            let index = inpArr.findIndex(v=>v===value);
            if(index>=0){
                inpArr.splice(index,1);
            }
        }
        return inpArr.join(",");
    }
    render(){
        const{countries=""}=this.props.option;
        const{cont}=this.props;
       return<div className="row">
           <div className="col-12">
               {this.makeCB(cont,countries.split(","),"countries","Countries")}
           </div>
       </div> 
    }
}