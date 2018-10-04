import React, { Component } from 'react';
const $ = window.$;
export default class AutoCompleteism extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.term = this.props.term;
  }

  render() {
    console.log(this.props.term.length);

if(this.props.term.length>1){
      this.dataArray = this.props.data.map(
        e =>
          (
            <li
              className="autoList"
              key={e._id}
              data={e.Name}
              onClick={event =>
                this.clickHandler(event.target.attributes.data.value)
              }>
              {e.Name}
            </li>
          ) || e.Namn
      );}else{
          this.dataArray=[]
      }
    
    console.log(this.dataArray);

    return <ul className="autoListItem">{this.dataArray}</ul>;
  }

  clickHandler(term) {
      this.setState({ term });
    this.props.clickTermChange(term);
    console.log(term);
  }
}
