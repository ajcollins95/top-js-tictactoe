const gameBoard = (() => {
    //gameboard module 
    let board = [' ',' ',' ',' ',' ',' ',' ',' ',' ']
    let players = []

    const getBoard = () => {return board};
    const getPlayers = () => {return players};

    const fill = (marker,index) => {
        if (board[index] == ' ' ){
            board[index] = marker
        }
    };

    const setPlayers = (plyrs) => {
        players = plyrs
    };

    const checkRows = () => {
        //checks Rows
        for (let i = 0; i < 3; i++) {
            let left = i * 3
            if (board[left] == board[left+1] && board[left+1] == board[left+2]){
                if (board[left] != ' ') {return board[left]}
            }
        } 
        return 0
    }

    const checkCols = () => {
        //checks columns
        for (let i = 0; i < 3; i++) {
            if (board[i] == board[i+3] && board[i+3] == board[i+6]){
                if (board[i] != ' ') {return board[i]}
            }
        } 
        return 0
    }

    const checkDiags = () => {
        let center = board[4]
        if ((center == board[0] && center == board[8]) || 
            (center == board[6] && center == board[2]) ) {
                if (center != ' ') {return center}
        }
        else {
            return 0
        }
        
    }

    const checkEndgame = () => {
        //Looks for Ties and Wins
        if (!board.includes(' ')) {
            alert('TIE')
            return 'Tie'
        }
        else if (checkCols() || checkRows() || checkDiags()){
            alert('WINNNNN')
        }
        
    }
    
    return {
      getBoard,
      fill,
      setPlayers,
      getPlayers,
      checkEndgame
    };
  })();

const displayController = ((doc) => {
    //writes things to the document

    let grid = doc.getElementsByClassName("grid")[0]
    let cells = grid.children

    const displayBoard = (board) => {
        for (let i = 0; i < cells.length; i++) {
            let p = cells[i].children[0]
            p.innerText = board.getBoard()[i] //getting the paragraph in the div
        } 
    }

    const attachListeners = (fn) => {
        //attaches listeners to cells with the given function (fn)
        for (let i = 0; i < cells.length; i++) {
            let cell = cells[i]
            cell.addEventListener('click', () => {
                let index = cell.classList[1]
                fn(index)
            }) 
        }     
    }

    const displayTurn = (brd) => {
        //shows whose turn it is
        let h4 = document.getElementsByTagName("h4")[0];
        let filledSpots = 0
        brd.getBoard().forEach( (box) => {
            if (box != ' ') {
                filledSpots++
            }
        })
        let activePlayer = brd.getPlayers()[0]
        if (filledSpots % 2 == 1) {
            activePlayer = brd.getPlayers()[1]
        }
        
        let msg = `It\'s ${activePlayer.name}\'s turn`
        h4.innerText = msg
    }

    const init = (fn) => {
        //initializes display 
        attachListeners(fn)
    }

    const render = (brd) => {
        displayBoard(brd)
        displayTurn(brd)
    }
    
    return {
      render,
      init,
    };
})(document);


const game = ((board, display) => {
    //game module 
    let gameRunning = 0

    const Player = (name, marker) => {
        //player factory function
        const mark = (index) => {
            board.fill(marker,index)
            display.render(board)
        }
        return { name,
                 mark}
    }

    const runTurn = (i) => {
        //runs a turn
        let currentPlayer = players[Number(activePlayer)]
        let brd = board.getBoard()

        if (brd[i] == ' ') {
            currentPlayer.mark(i)
            activePlayer = !activePlayer
            display.render(board)
            board.checkEndgame()
        }
    }

    


    const cellClicked = (i) => {
        //what to do when a cell is clicked
        if (gameRunning)  {
            runTurn(i)
        }
    }

    const init = () => {
        board.setPlayers(players)
        display.render(board)
        display.init(cellClicked)
        gameRunning = 1
    }

    let player0 = Player('Harry','X')
    let player1 = Player('Ron','0')
    let players = [player0, player1]
    let activePlayer = 0

    return {
      init
    };

})(gameBoard,displayController);

game.init()
