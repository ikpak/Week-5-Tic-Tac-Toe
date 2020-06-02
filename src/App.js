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
      <div>
        <h1>Tic Tac Toe</h1>
        <div className="row">
          <div>
            <Board {...this.state} setTheState={this.setTheState} />
          </div>
          <div>
            History:
            {this.state.history.map((item, idx) => {
              return <div><button onClick={() => this.timeTravel(idx)}>move {idx+1}</button></div>})
            }
          </div>
        </div>
      </div>
    )
  }
}

