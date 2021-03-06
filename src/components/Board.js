import React, { Component } from 'react'
import Square from './Square'

let startTime = 0
let endTime = 0

export default class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: ''
        }
    }

    renderSquare = (num) => {
        return <Square id={num} boxClick={this.boxClick} value={this.props.squares[num]} />
    }

    boxClick = (id) => {
        let currentPointer = this.props.current

        currentPointer++

        let squaresFromApp = this.props.squares

        if(squaresFromApp.every(item => item === null)) {
            startTime = Date.now()
        }

        if(this.calculateWinner(squaresFromApp) || squaresFromApp[id]) {
            alert("Choose a different tile")
            return
        } 

        squaresFromApp[id] = this.props.isXNext ? 'X' : 'O'

        let winner = this.calculateWinner(this.props.squares)

        if(winner) {
            this.setState({status:`Winner: ${winner}`})
            endTime = Date.now()
            let duration = Math.floor((endTime - startTime) / 1000)
            this.props.postData(duration)
        } else {
            this.setState({status: `Next player: ${this.props.isXNext ? 'X' : 'O'}`})
        }

        let cutHistory = this.props.history.slice(0, currentPointer)

        this.props.setTheState ({
            squares: squaresFromApp.slice(), 
            isXNext: !this.props.isXNext, 
            history: [
                ...cutHistory.slice(), {
                    squares: squaresFromApp.slice(), 
                    isXNext: !this.props.isXNext
                }
            ],
            current: currentPointer
        })
    }

    calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        for(let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]
            if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]
            }
        }

        return null
    }

    render() {
        this.props.getData()

        return (
            <div>
                <h2 className="status">{this.state.status}</h2>
                <div className="row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}
