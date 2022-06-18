import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const table =[];

// function class for crate square and propriets for square game
function Square(props){

        return (
          <button
            className="square" onClick={props.onClick}>
            {props.value}
          </button>
      );
  }
  
  //componente React
  class Board extends React.Component {
    //method for rendering Square function class whit propriertes squares(buttom)
    renderSquare(i) {
      return ( <Square
       value={this.props.squares[i]} //valor do button de acordo com o array do state do contrutor, {squares: Array(9).fill()}
        onClick={() => this.props.onClick(i)}
       
       />);
    }
  
   loopSquares(){ 
    const rows =[
      [0,1,2],
      [3,4,5],
      [6,7,8]
    ];
    var square=[]
   for (let y = 0; y < 3; y++){
      for (let i = 0; i <3; i++){      
      
       square[i]=this.renderSquare(rows[y][i]);
       
       if(i==2){ 
         table[y]=(
         <div className='board-row' key={y}>
             {square[0]}    
             {square[1]} 
             {square[2]} 
           </div>
         );
       }
      }
     }
   return table; 
   }
     

    render() {   
      return (
        <div> 
           {this.loopSquares()} 
        </div>
      );
    }
}
  //componente
  class Game extends React.Component {

      constructor(props){
          super(props);
          this.state = {
              history: [{
                  squares: Array(9).fill(null),
                  collines:0,
                  
              }],
              stepNumber: 0,
              xIsNext: true,
              currentsimbol:[],
              index:0,
              clickbutton:false,
              idclick:0,
          }
          
      }
      //click on squares method
      handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        //winner verify for state squares array for time of game played
        if(calculateWinner(squares) || squares[i]) {
            return
        }
        const simbol = squares[i] = this.state.xIsNext ? 'X': 'O';
        this.state.currentsimbol[this.state.index] =simbol
        this.setState({      
            history: history.concat([{
                squares: squares,
                collines:i
           }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
            index: this.state.index+1,
           
          });
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
            clickbutton:true,
            idclick:step,
        });
        document.getElementById(step).style.fontWeight="bold";
        document.getElementById(this.state.idclick).style.fontWeight="";      
    }
   
    render() {
        const simbol =  this.state.currentsimbol;
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move)=> {
      
              const grid={
                  line: Math.floor(step.collines/3),
                  col: step.collines % 3
                }
              const desc = move ?
                'Go to move #' + move+ `col: ${grid.col} line: ${grid.line}  ${simbol[move-1]}` :
                'Go to game start';
            
                return (
                    <li key={move}>
                        <button id={move} onClick={()=> this.jumpTo(move)}>{desc}</button>
                    </li>
                )
        })
        let status;
        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
      return (
        <div className="game">
          <div className="game-board">   
            <Board 
            //update square for board game are position state players
            squares ={current.squares}
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
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  

