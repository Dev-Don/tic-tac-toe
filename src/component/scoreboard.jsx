import React from 'react';
import { Link } from 'react-router-dom';
import { Storage } from '../storage/storage';

export class Scoreboard extends React.Component {
    state = {
        scoreboard: []
    }

    async componentDidMount() {
        let storage = await new Storage().getData();

        this.setState({
            scoreboard: storage
        })
    }

    render() {
        return (
            <div className="game">
                <h1>Recent Games:</h1>
                <ul>
                    {this.state.scoreboard.map((winner, index) => {
                        return <li key={index}>{winner}</li>
                    })}
                </ul>

                <Link to="/board">
                    <button className="btn">Start New Game</button>
                </Link>
            </div>
        )
    }
}