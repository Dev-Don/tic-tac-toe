import React from 'react';
import { Link } from 'react-router-dom';
import { storage } from '../storage/storage';
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
        if(utils.findWinner(boxes) || boxes[index]){
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
        const isWinner = untils.GetWinner(this.state.boxes);

        const allBoxesFilled = untils.areAllBoxesFilled(this.state.boxes);

        let message;
        if(isWinner){
            message = isWinner + "won the game!";
            
            // Update storage with game winner
            this.storage.update([isWinner + "won"]);
        }else if(!isWinner && allBoxesFilled){
            message = "No winner!";

            // Update storage with game status
            this.storage.update(["No winner"]);
        }else{
            message = "Player " + this.state.xIsNext ? 'x' : 'o' + "turn";
        }
    }
}
