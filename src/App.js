import React, { Component } from 'react'
import Board from './components/Board'
import './App.css'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true,
      history: [],
      winner: null
    }
  }

  setTheState = (obj) => {
    this.setState(obj)
  }

  timeTravel = (id) => {
    this.setTheState(this.state.history[id])
  }

  render() {
    return (
      <div className="body">
        <h1 className="title">Xs and Os</h1>
        <div className="row">
          <div className="board">
            <Board {...this.state} setTheState={this.setTheState} />
          </div>
          <div className="history">
            <h3>History:</h3>
            {this.state.history.map((item, idx) => {
              return <div className="move"><button onClick={() => this.timeTravel(idx)}>Move {idx+1}</button></div>})
            }
          </div>
        </div>
      </div>
    )
  }
}

