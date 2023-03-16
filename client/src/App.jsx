import React, { Component } from 'react';
import { Board } from './Board';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="app-wrapper">
                <div className="app-main">
                    <Board />
                </div>
            </div>
        );
    }
}

export default App;
