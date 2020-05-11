import React from 'react';
import { Link } from 'react-router-dom';
import { Storage } from './../storage/storage';
import { Box } from './board-box';
import * as utils from '../utils/functions';


export class Board extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            boxes: Array(9).fill(null),
            history: [],
            xIsNext: true
        }
    }

    storage = new Storage();
    
    handleBoxClick(index){
        // Get current state of boxes
        const boxes = this.state.boxes.slice();

        // Get current state of history
        const history = this.state.history;

        // Stop game if board contains winning number
        if(utils.GetWinner(boxes) || boxes[index]){
            return;
        }

        // Stop game if all boxes are filled
        if(utils.areAllBoxesFilled(boxes) === true){
            return;
        }

        // Mark the box either as 'x' or 'o' 
        boxes[index] = this.state.xIsNext ? 'x' : 'o';

        // Adding move to game history
        history.push(this.state.xIsNext ? 'x' : 'o');

        // Update component state with new data
        this.setState({
            boxes: boxes,
            history: history,
            xIsNext: !this.state.xIsNext
        })
    }

    handleBoardRestart = () => {
        this.setState({
            boxes: Array(9).fill(null),
            history: [],
            xIsNext: true
        })
    }

    render() {
        // Get winner
        const isWinner = utils.GetWinner(this.state.boxes);

        const allBoxesFilled = utils.areAllBoxesFilled(this.state.boxes);

        let message;
        if(isWinner){
            message = "Player " + isWinner + " won the game!";
            
            // Update storage with game winner
            this.storage.update([isWinner + " won!"]);
        }else if(!isWinner && allBoxesFilled){
            message = "No winner!";

            // Update storage with game status
            this.storage.update(["No winner"]);
        }else{
            message = "Player " + this.state.xIsNext ? 'x' : 'o' + "turn";
        }

        return(
            <>
                <Link to="/" className="board-link">Scoreboard</Link>

                <div className="board-wrapper">
                    <div className="board">
                        <h2 className="board-heading">{message}</h2>
                        <div className="board-row">
                            <Box value={this.state.boxes[0]} onClick={() => this.handleBoxClick(0)} />
                            <Box value={this.state.boxes[1]} onClick={() => this.handleBoxClick(1)} />
                            <Box value={this.state.boxes[2]} onClick={() => this.handleBoxClick(2)} />
                        </div>
                        <div className="board-row">
                            <Box value={this.state.boxes[3]} onClick={() => this.handleBoxClick(3)} />
                            <Box value={this.state.boxes[4]} onClick={() => this.handleBoxClick(4)} />
                            <Box value={this.state.boxes[5]} onClick={() => this.handleBoxClick(5)} />
                        </div>
                        <div className="board-row">
                            <Box value={this.state.boxes[6]} onClick={() => this.handleBoxClick(6)} />
                            <Box value={this.state.boxes[7]} onClick={() => this.handleBoxClick(7)} />
                            <Box value={this.state.boxes[8]} onClick={() => this.handleBoxClick(8)} />
                        </div>
                    </div>
                    <div className="board-history">
                        <h2 className="board-heading">Past Moves History</h2>
                        <ul className="board-historyList">
                            {this.state.history.length === 0 && <span>No moves yet.</span>}
                            {this.state.history.length !== 0 && this.state.history.map((move, index) => {
                                return <li key={index}>
                                    Move {++index}: <strong>{move}</strong> 
                                </li>
                            })}
                        </ul>
                    </div>
                    {isWinner && <div className="board-footer">
                        <button className="btn" onClick={this.handleBoardRestart}>
                            Reset Game
                        </button>
                        </div>
                    }
                </div>
            </>
        )
    }
}
