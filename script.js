const gameBoard = (() => {
    //gameboard module 
    let board = []
    const add = (a, b) => a + b;
    
    return {
      add,
 
    };
  })();

const displayController = ((doc) => {
    //writes things to the document
    const sub = (a, b) => a - b;
    
    return {
      sub,

    };
})(document);

const game = ((gBrd, dispCont) => {
    //game module 
    
    const Player = (name) => {
        //player factory function
        const sayName = () => console.log(`my name is ${name}`)
        return {sayName}
    }
    
    const init = () => {
        //do init things
    }
    return {
      init
    };
})(gameBoard,displayController);


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