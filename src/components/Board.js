import React, { Component } from 'react'
import Square from './Square'

export default class Board extends Component {
    renderSquare = (num) => {
        return <Square id={num} boxClick={this.boxClick} value={this.props.squares[num]} />
    }

    boxClick = (id) => {
        let squaresFromApp = this.props.squares

        if(this.calculateWinner(squaresFromApp) || squaresFromApp[id]) {
            alert("Choose a different tile")
            return
        } 

        squaresFromApp[id] = this.props.isXNext ? 'X' : 'O'
        this.props.setTheState ({
            squares: squaresFromApp, isXNext: !this.props.isXNext, 
            history: [...this.props.history, {squares: squaresFromApp.slice(), isXNext: !this.props.isXNext}]
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
        const winner = this.calculateWinner(this.props.squares)
        let status = ''

        if(winner) {
            status = `Winner: ${winner}`
        } else {
            status = `Next player: ${this.props.isXNext ? 'X' : 'O'}`
        }

        return (
            <div>
                <h2>{status}</h2>
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
