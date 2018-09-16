import React, { Component } from 'react';
import '../css/App.css';

class App extends Component {

  host = window.location.hostname;

  state = {
    root: []
  }

  getRoot = () => {

    fetch('http://' + this.host + ':4800/root')
        .then(res => res.json())
        .then(
          (result) => {
            // filter out hidden dotfiles
            let visibleItems = result.filter((item) => {
              if (item[0] !== ".") {
                return item
              }
            })
            this.setState({
              root: visibleItems
            });
          },
          (error) => {
            this.setState({ error });
          }
        )
  }

  componentDidMount = () => {

    this.getRoot();

  }

  render() {

    const items = this.state.root.map((item) => {
      return (
        <div>
          {item}
        </div>
      )
    })

    return (
      <div className="App">
        <div className="App-header">
          <h2>My Home Directory</h2>
        </div>
        <p className="App-intro">
          More items
          { this.state.root !== [] ? 
            <div className="itemList">{items}</div>
            : "No items yet" }
        </p>
      </div>
    );
  }
}

export default App;
