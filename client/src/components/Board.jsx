import React, { Component } from 'react';
import { ROWSIZE } from '../settings';
import './Board.css';

export class Board extends Component {

    state = {
        rows: Array(ROWSIZE).fill(0),
    };

    renderField = (index) => {
        return (
            <button key={index}
                className={"board-field" + (this.props.squares[index - 1] ? " board-field-marked" : "")}
                onClick={() => this.props.squareClick(index)}
            />
        );
    }

    render() {
        return (
            <div className="board">
                {this.state.rows.map((row, rowIndex) =>
                    <div key={rowIndex} className="board-row">
                        {this.state.rows.map((col, colIndex) => {
                            return this.renderField((rowIndex * ROWSIZE) + (colIndex + 1))
                        })}
                    </div>
                )}
            </div>
        );
    }
}
