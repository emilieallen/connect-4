function init() {
    // DOM
    const grid = document.querySelector(".grid") // get this with querySelector
    const start = null // get this with querySelector
    const scoreDisplay = document.getElementById("score-display")// get this with querySelector
  
    const gridCellCount = 6 * 7
    
    let score = 0;
    let currentPlayer = 'player-1';

    const playerDiskIdDict = {
        'player-1': {'diskId': 'firstPlayerDisk', 'name': ''},
        'player-2': {'diskId': 'secondPlayerDisk', 'name': ''}
    };

    scoreDisplay.innerHTML = score;
  
  
    function createGrid() {
      // we need to create one square (div) for every grid cell
      for (let i=1; i <= gridCellCount; i++) {
        const elem = document.createElement("div");
        elem.id = `${i}`;
        elem.addEventListener("click", handleMoleClick);
        grid.appendChild(elem);
      }
    }

    const initialisePlayer = () => {
        currentPlayer = 'player-1'
    }

    const nextPlayer = () => {
        currentPlayer === 'player-1' ? currentPlayer = 'player-2' : currentPlayer = 'player-1';
        console.log(currentPlayer);
    }
  
    function handleMoleClick(e) {
        if (!document.getElementById(`${e.target.id}`).className) {
            const validateClick = () => {
                const cellDisk = document.createElement("div");
                cellDisk.id = playerDiskIdDict[currentPlayer]['diskId'];
                document.getElementById(`${e.target.id}`).className = currentPlayer;
                document.getElementById(`${e.target.id}`).appendChild(cellDisk);
                nextPlayer();
            }
            if (e.target.id < 36 && !!document.getElementById(`${Number(e.target.id) + 7}`).className) {
                validateClick();
            } else if (e.target.id >= 36) {
                validateClick();
            };
        };
    }
  
    function startGame() {
        initialisePlayer();
    }
  
    // create the grid
    createGrid();
    
    // start the game when the user clicks the start game button
    document.getElementById("start").addEventListener("click", startGame);
  
  }
  
  document.addEventListener('DOMContentLoaded', init)


