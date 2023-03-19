import React, { Component } from 'react';
import { Board } from './Board';
import { ROWSIZE } from '../settings';
import { apiRecognize, apiLearn } from "../api";
import './App.css';

class App extends Component {
    letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    state = {
        squares: Array(ROWSIZE * ROWSIZE).fill(0),
        squaresSelected: 0,
        recognizedLetted: undefined,
        recognCorrect: undefined,
        recognFailure: undefined,
        correctAnswer: undefined,
    };

    squareClick = (index) => {
        let squares = this.state.squares.slice();
        let squaresSelected = this.state.squaresSelected;
        if (squares[index - 1]) {
            squares[index - 1] = 0;
            squaresSelected--;
        } else {
            squares[index - 1] = 1;
            squaresSelected++;
        };
        this.setState({
            squares: squares,
            squaresSelected: squaresSelected,
            recognizedLetted: undefined
        });
    }

    recognize = () => {
        apiRecognize({ board: this.state.squares }).then((retVal) => {
            this.setState({
                recognizedLetted: retVal.response,
                recognCorrect: undefined,
                recognFailure: undefined,
                correctAnswer: undefined,
            })
        }, (error) => {
            alert(error);
        });
    }

    recognCorrect = () => {
        this.setState({
            recognCorrect: true,
            recognFailure: false,
            correctAnswer: undefined,
        })
    }

    correctAnswer = (letter) => {
        apiLearn({ board: this.state.squares, letter: letter }).then(() => {
            this.setState({
                recognCorrect: false,
                recognFailure: true,
                correctAnswer: letter
            })
        }, (error) => {
            alert(error);
        });
    }

    render() {
        return (
            <div className="app-wrapper">
                <div className="app-body">
                    <h1>Rozpoznawanie liter</h1>
                    <div className="app-main">
                        <div className="left-pane">
                            Narysuj literę (A-Z):<br /><br />
                            <Board squares={this.state.squares} squareClick={this.squareClick} />
                        </div>
                        <div className="right-pane">
                            <button className="recognizeButton" onClick={this.recognize} disabled={!this.state.squaresSelected}>Rozpoznaj</button>
                            {this.state.recognizedLetted ?
                                <>
                                    <span className="recognizedLetted">To jest litera: {this.state.recognizedLetted}</span>
                                    {this.state.recognCorrect ?
                                        <span>Wspaniale!</span> :
                                        this.state.recognFailure ? <span>Prawidłowa litera: {this.state.correctAnswer}</span> :
                                            <>
                                                <div>
                                                    <span>Czy dobrze?</span>&nbsp;
                                                    <button onClick={this.recognCorrect}>TAK</button>
                                                </div>
                                                <span>&nbsp;</span>
                                                <span>Jeśli źle, to jaka jest poprawna odpowiedź?</span>&nbsp;
                                                <div>
                                                    {this.letters.map(l =>
                                                        <button key={l} onClick={() => this.correctAnswer(l)}>{l}</button>
                                                    )}
                                                </div>
                                            </>
                                    }
                                </>
                                : null
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
