import React, { Component } from 'react';
import '../css/App.css';

class App extends Component {

  host = window.location.hostname;

  state = {
    root: [],
    child: []
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

  handleSelection = (item) => {
    console.log(item);
    fetch('http://' + this.host + ':4800/child', {
      method: "POST",
      body: {
        child: item
      }
    })
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
          child: visibleItems
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
        <div className="item">
          <a href="#" onClick={this.handleSelection.bind(item)}>
            <i className="far fa-folder">  {item}</i>
          </a>
        </div>
      )
    })

    return (
      <div className="App">
        <div className="App-header">
          <h2>My Home Directory</h2>
        </div>
        <p className="App-intro">
      
          { this.state.root !== [] ? 
            <div className="itemList">{items}</div>
            : "No items yet" 
          }
    
        </p>
      </div>
    );
  }
}

export default App;
