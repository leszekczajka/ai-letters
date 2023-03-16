import React, { Component } from 'react';
import './Board.css';

const ROWSIZE = 8;

export class Board extends Component {

    state = {
        rows: Array(ROWSIZE).fill(null),
        squares: Array(ROWSIZE * ROWSIZE).fill(null),
    };

    handleClick = (index) => {
        console.log(index);
        let squares = this.state.squares.slice();
        if (squares[index - 1]) {
            squares[index - 1] = null;
        } else {
            squares[index - 1] = 'X';
        };
        this.setState({
            squares: squares
        });
    }

    renderField = (index) => {
        return (
            <button className={"board-field" + (this.state.squares[index - 1] ? " board-field-marked" : "")} onClick={() => this.handleClick(index)}>

            </button>
        );
    }

    render() {
        return (
            <div className="board">
                {this.state.rows.map((row, rowIndex) =>
                    <div className="board-row">
                        {this.state.rows.map((col, colIndex) =>
                            <>
                                {this.renderField((rowIndex * ROWSIZE) + (colIndex + 1))}
                            </>
                        )}
                    </div>
                )}
            </div>
        );
    }
}
