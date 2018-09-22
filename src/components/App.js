import React, { Component } from 'react';
import '../css/App.css';

class App extends Component {

  host = window.location.hostname;

  state = {
    root: [],
    child: []
  }

  getRoot = () => {

    let path = "root";

    fetch(`http://${this.host}:4800/${path}`)
        .then(res => res.json())
        .then(
          (result) => {
            // filter out hidden dotfiles
            let visibleItems = result.filter((item) => {
              if (item.split("/")[1][0] !== ".") {
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

    fetch(`http://${this.host}:4800/child`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "parent": item
      })
    })
    .then(res => res.json())
    .then(
      (result) => {
        // filter out hidden dotfiles
        let visibleItems = result.filter((item) => {
          if (item.split("/")[1][0] !== ".") {
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
          <a href="#" value={item} onClick={() => this.handleSelection(item)}>
            <i className="far fa-folder">  {item}</i>
          </a>
        </div>
      )
    })

    const children = this.state.child.map((item) => {
      return (
        <div className="child">
          <a href="#" >
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
            <div className="itemList">
              {items}
              {this.state.child !== [] ? 
                <div className="childList">
                  {children}
                </div> 
              : null
              }
            </div>
            : "No items yet" 
          }
    
        </p>
      </div>
    );
  }
}

export default App;
