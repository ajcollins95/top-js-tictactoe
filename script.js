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

    const getPlayerTurn = () => {
        let emptyCount = 0
        board.forEach( (cell) => {
            if (cell == ' ') { emptyCount++}
        })
        return emptyCount % 2
    }

    const checkEndgame = () => {
        //Looks for Ties and Wins
        if (!board.includes(' ')) {
            return 'Tie'
        }
        else if (checkCols() || checkRows() || checkDiags()){
            return(getPlayerTurn() + 1)
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
    let form = doc.getElementsByClassName('formcontainer')[0]
    let start = doc.getElementsByClassName('start')[0]

    const displayBoard = (board) => {
        for (let i = 0; i < cells.length; i++) {
            let p = cells[i].children[0]
            p.innerText = board.getBoard()[i] //getting the paragraph in the div
        } 
    }

    const displayPlayerForm = (status) => {
        if (status) {
            form.style.display = 'block'
        }
        else {
            form.style.display = ''
        }
        
    }

    const attachListeners = (fns) => {
        //attaches listeners to cells with the given function (fn)
        let cellFn = fns[0]
        let startFn = fns[1]
        for (let i = 0; i < cells.length; i++) {
            let cell = cells[i]
            cell.addEventListener('click', () => {
                let index = cell.classList[1]
                cellFn(index)
            }) 
        }   
    
        start.addEventListener('click', function(e) {
            //prevent from reloading the page
            e.preventDefault()
            let submit = this
            let p2 = submit.previousElementSibling
            let p1 = p2.previousElementSibling.previousElementSibling //skip <br>
            startFn(p1.value,p2.value)
        })
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

    return {
        init,
        displayBoard,
        displayTurn,
        displayPlayerForm
    };
})(document);


const game = ((board, display) => {
    //game module 
    let isGameRunning = 0
    let players = []
    let activePlayer = 0

    const Player = (name, marker) => {
        //player factory function
        const mark = (index) => {
            board.fill(marker,index)
            render(board)
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
            render(board)
            let endStatus = board.checkEndgame()
            if (endStatus) {endGame(endStatus)}

        }
    }

    const endGame = (end) => {
        //ends the game
    }

    const cellClicked = (i) => {
        //what to do when a cell is clicked
        if (isGameRunning)  {
            runTurn(i)
        }
    }

    const submitClicked = (p1,p2) => {
        //when the start game button is clicked
        isGameRunning = 1
        let player0 = Player(p1 || 'Player 1','X')
        let player1 = Player(p2 || 'Player 2','0')
        players = [player0, player1]
        board.setPlayers(players)
        render(board)

    }

    const render = () => {
        display.displayBoard(board)
        if (isGameRunning) {
            display.displayTurn(board)    
        }
        
        display.displayPlayerForm(!isGameRunning)
       
    }
    

    const init = () => {
        render(board)
        display.init([cellClicked,submitClicked])
        //isGameRunning = 1
    }

    return {
      init
    };

})(gameBoard,displayController);

game.init()
