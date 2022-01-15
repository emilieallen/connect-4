function init() {
    // DOM
    const grid = document.querySelector(".grid") // get this with querySelector
    const start = null // get this with querySelector
    const scoreDisplay = document.getElementById("score-display")// get this with querySelector
  
    const gridCellCount = 6 * 7
    const rawCount = 6
    const colCount = 7
    
    let score = 0;
    let currentPlayer = 'player-1';

    const playerDiskIdDict = {
        'player-1': {'diskId': 'firstPlayerDisk', 'name': ''},
        'player-2': {'diskId': 'secondPlayerDisk', 'name': ''}
    };

    scoreDisplay.innerHTML = score;
  
  
    // function createGrid() {
    //   // we need to create one square (div) for every grid cell
    //   for (let i=1; i <= gridCellCount; i++) {
    //     const elem = document.createElement("div");
    //     elem.id = `${i}`;
    //     elem.addEventListener("click", handleMoleClick);
    //     grid.appendChild(elem);
    //   }
    // }
    
    const cellPositionDict = {};

    function createGrid() {
        // create 6 rows
        for (let i=1; i <= rawCount; i++) {
          const elem = document.createElement("div");
          elem.className = `row ${i}`;
          grid.appendChild(elem);
        // create 7 cols
          for (let c=1; c <= colCount; c++) {
            const subElem = document.createElement("div");
            let cellId = c + 7 * (i - 1);
            subElem.id = `${cellId}`;
            subElem.className = `x${c} y${i} freeDisk`;
            subElem.addEventListener("click", handleMoleClick);
            elem.appendChild(subElem);
            
            cellPositionDict[cellId] = {'x':c, 'y':i};
          };
        };
      }

    const initialisePlayer = () => {
        currentPlayer = 'player-1'
    }

    const nextPlayer = () => {
        currentPlayer === 'player-1' ? currentPlayer = 'player-2' : currentPlayer = 'player-1';
        console.log(currentPlayer);
    }



    function handleMoleClick(e) {
        console.log(e.target.id);
        const classList = document.getElementById(`${e.target.id}`).classList;
        if (!classList.contains('firstPlayerDisk') || !classList.contains('secondPlayerDisk')) {
            console.log('first step');
            const validateClick = () => {
                // const cellDisk = document.createElement("div");
                // cellDisk.id = playerDiskIdDict[currentPlayer]['diskId'];
                // document.getElementById(`${e.target.id}`).appendChild(cellDisk);
                classList.remove('freeDisk');
                classList.add(playerDiskIdDict[currentPlayer]['diskId']);
                nextPlayer();
            }
            if (e.target.id < 36 && (document.getElementById(`${Number(e.target.id) + 7}`).classList.contains('firstPlayerDisk') || document.getElementById(`${Number(e.target.id)+7}`).classList.contains('secondPlayerDisk'))) {
                validateClick();
            } else if (e.target.id >= 36) {
                console.log('o3');
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



//   function handleMoleClick(e) {
//     console.log(e.target.id);
//     const classList = document.getElementById(`${e.target.id}`).classList;
//     if (!classList.contains('firstPlayerDisk') || !classList.contains('firstPlayerDisk')) {
//         const validateClick = () => {
//             const cellDisk = document.createElement("div");
//             cellDisk.id = playerDiskIdDict[currentPlayer]['diskId'];
//             // document.getElementById(`${e.target.id}`).className = currentPlayer;
//             document.getElementById(`${e.target.id}`).appendChild(cellDisk);
//             nextPlayer();
//         }
//         if (e.target.id < 36 && !!document.getElementById(`${Number(e.target.id) + 7}`).className) {
//             validateClick();
//         } else if (e.target.id >= 36) {
//             validateClick();
//         };
//     };
// }


// function getKeyByValue(object, value) {
//     return Object.keys(object).find(key => object[key] === value);
//   }
  
// const map = {"first" : "1", "second" : "2"};
// console.log(getKeyByValue(map,"2"));