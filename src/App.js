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
      winner: null,
      current: 0
    }
  }

  setTheState = (obj) => {
    this.setState(obj)
  }

  timeTravel = (id) => {
    let newArray = this.state.history.slice()

    this.setState({
      squares: newArray[id].squares.slice(),
      isXNext: newArray[id].isXNext,
      history: newArray.slice(),
      current: id
    })
  }

  render() {
    return (
      <div className="body">
        <h1 className="title">TIC-TAC-TOE</h1>
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

