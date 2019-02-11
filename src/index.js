// import React from 'react';
import React, { Component } from 'react'; // <-- Se importa Component
import ReactDOM from 'react-dom';
import './index.css';

// To save typing and avoid the confusing behavior of "this", we will use the
// arrow function syntax for event handler.

// class Square extends Component {
//   render() {
//     return (
//       <button
//         className="square"
//         onClick={ () => this.props.onClick() }
//       >
//         {this.props.valor}
//       </button>
//     );
//   }
// }

function calculateWinner(squares){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for(let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];

    if(squares[a] &&
       squares[a] === squares[b] &&
       squares[a] === squares[c])
    {
        return squares[a];
    }
  }

  return null;
}

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.valor}
    </button>
  );
}

class Board extends Component {

  renderSquare(i,col, row) {
    return (
      <Square
        valor={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
   );
  }

  render() {

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0,1,1)}
          {this.renderSquare(1,2,1)}
          {this.renderSquare(2,3,1)}
        </div>
        <div className="board-row">
          {this.renderSquare(3,1,2)}
          {this.renderSquare(4,2,2)}
          {this.renderSquare(5,3,2)}
        </div>
        <div className="board-row">
          {this.renderSquare(6,1,3)}
          {this.renderSquare(7,2,3,)}
          {this.renderSquare(8,3,3)}
        </div>
      </div>
    );
  }
}

class Game extends Component {

  constructor(){
    super();
    this.state = {
      history:[{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
      // posicion: null
    }
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if(calculateWinner(squares) || squares[i])
    {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X': 'O';

    // squares.map((paso, movimiento) =>{
    //   if(paso != null){
    //     // return(
    //       this.setState({posicion: movimiento})
    //     // );
    //   }
    // })

    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      // posicion: this.state.posicion
    })
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {

      const desc = move ? 'GO TO MOVE #'+move : 'GO TO GAME START';

      return(
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc} </button>
        </li>
      )
    });

    let status;

    if(winner){
      status = 'Winner: '+ winner;
    }else{
      status = 'Next player: '+ (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


// 1.- Display the location for each move in the format (col, row) in the move history list.
// 2.- Bold the currently selected item in the move list.
// 3.- Rewrite Board to use two loops to make the squares instead of hardcoding them.
// 4.- Add a toggle button that lets you sort the moves in either ascending or descending order.
// 5.- When someone wins, highlight the three squares that caused the win.
// 6.- When no one wins, display a message about the result being a draw.
