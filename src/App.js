import React, { Component } from 'react'
import Board from './components/Board'
import './App.css'
import FacebookLogin from 'react-facebook-login'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true,
      history: [],
      winner: null,
      current: 0,
      topRank: [],
      userName: "User Name"
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

  getData = async() => {
    let url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`
    let data = await fetch(url)
    let result = await data.json()
    this.setState({...this.state, topRank:result.items})
  }

  responseFacebook = (response) => {
    console.log("Response is:", response)
    this.setState({userName: response})
  }

  componentDidMount() {
    this.getData()
  }

  postData = async(duration) => {
    let data = new URLSearchParams()
    data.append("player", this.state.userName.name)
    data.append("score", duration)
    console.log("time", duration)
    const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data.toString(),
        json: true
    })
    console.log("Post data:", response)
  }

  render() {
    return (
      <div className="body">
        <div className="row facebook">
          {(this.state.userName) ? 
            <div className="user row">User Name:<div className="name">{this.state.userName.name}</div></div> : 
            <div>
              <FacebookLogin
                className = "loginBtn"
                autoLoad = {true}
                appId = "188067455802571"
                fields = "name, email, picture"
                callback = {(resp) => this.responseFacebook(resp)}
                textButton = "Login"
                icon = "fab fa-facebook-square"
              />
            </div>
          }
        </div>
        <h1 className="title">TIC-TAC-TOE</h1>
        <div className="row">
          <div className="board">
            <Board {...this.state} setTheState={this.setTheState} postData={this.postData} getData={this.getData} />
          </div>
          <div className="history">
            <h3>History:</h3>
            {this.state.history.map((item, idx) => {
              return <div className="move"><button onClick={() => this.timeTravel(idx)}>Move {idx+1}</button></div>})
            }
          </div>
          <div className="ranking">
            <h3>Top Ranking:</h3>
            <ol>
              {this.state.topRank.map(item => {return <li>{item.player}:{item.score}</li>})}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

