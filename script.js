const gameBoard = (() => {
    //gameboard module 
    let board = ['O','X',' ',' ','O',' ','X','X','X']
    const getBoard = () => {return board};
    
    return {
      getBoard,
 
    };
  })();

const displayController = ((doc) => {
    //writes things to the document
    const sub = (a, b) => a - b;

    const displayBoard = (board) => {
        let grid = doc.getElementsByClassName("grid")[0]
        let cells = grid.children
        for (let i = 0; i < cells.length; i++) {
            let p = cells[i].children[0]
            p.innerText = board.getBoard()[i] //getting the paragraph in the div
          } 
    }

    const render = (brd) => {
        displayBoard(brd)
    }
    
    return {
      render,

    };
})(document);


const game = ((board, display) => {
    //game module 
    
    const Player = (name) => {
        //player factory function
        const sayName = () => console.log(`my name is ${name}`)
        return {sayName}
    }

    const init = () => {
        display.render(board)
    }
    return {
      init
    };
})(gameBoard,displayController);

game.init()
  /*
  const displayController = (() => {
    //gameboard module 
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => a / b;
    
    return {
      add,
      sub,
      mul,
      div,
    };
  })();
  */