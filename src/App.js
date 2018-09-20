import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch('http://localhost:3000/allaingreds/räkor')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          items: json
        });
      });
  }

  render() {
    var { isLoaded, items } = this.state;
    if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return <div className="App">
      <ul>
        {items.map(item=>(<li key={item.Namn}>{item.Namn}</li>))}

      </ul>
      </div>;
    }
  }
}

export default App;
