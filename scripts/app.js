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
            
            cellPositionDict[cellId] = {'x':`x${c}`, 'y':`y${i}`};
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

    const rightDiagonalCells = (classList) => {
        let x = Number(classList[0][1]);
        let y = Number(classList[1][1]);
        let iMin = Math.max(1, x - y + 1);
        let iMax = Math.min(7, x - y + 6);
        let result = []; 
        for (let i=iMin; i<=iMax;i++) {
            result.push(`x${i}.y${i+y-x}`);
        }
        return result.join()
    }

    function straightConsecutiveOccurence(classList) {
        function getScore(array, player) {
            let number = 0;
            [...array].forEach(element => {
                if (number < 4 && element.classList[2] === player) {
                    number++;
                } else if (number === 4) {
                    console.log('Victory');
                } else {
                    number = 0;
                }});
            return number;
        }
    
        var obj = {
            'targetId': classList,
            'hScore': getScore(document.getElementsByClassName(classList[1]), playerDiskIdDict[currentPlayer]['diskId']),
            'vScore': getScore(document.getElementsByClassName(classList[0]), playerDiskIdDict[currentPlayer]['diskId']),
            'rDiagScore': rightDiagonalCells(classList)
          }
        //   console.log(obj.hScore);
        //   console.log(obj.vScore);
          console.log(obj.rDiagScore);
        //   console.log(obj);

    }


    function handleMoleClick(e) {
        const classList = document.getElementById(`${e.target.id}`).classList;
        if (!classList.contains('firstPlayerDisk') || !classList.contains('secondPlayerDisk')) {
            const validateClick = () => {
                classList.remove('freeDisk');
                classList.add(playerDiskIdDict[currentPlayer]['diskId']);
                straightConsecutiveOccurence(classList);
                nextPlayer();
            }
            if (e.target.id < 36 && (document.getElementById(`${Number(e.target.id) + 7}`).classList.contains('firstPlayerDisk') || document.getElementById(`${Number(e.target.id)+7}`).classList.contains('secondPlayerDisk'))) {
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

// i_min = max(1, x - y + 1)
// i_max = min(7, x - y + 6)

// for i_min<i<i_max:
//   get class(i, i+y-x, player)

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

// check horizontal score

// let x:col & y:row

// get row/col number of cell clicked



// get row/col number of first occurence of player's disk

// const firstOccurence = document.getElementsByClassName(`${rowNum} ${playerDiskIdDict[currentPlayer]['diskId']}`)[0].classList[0]



// check consecutive occurence of same payer's disks


// function straightConsecutiveOccurence(e) {
//     const rowNum = document.getElementById(`${e.target.id}`).classList[1];
//     const colNum = document.getElementById(`${e.target.id}`).classList[0];
//     const rowCells = document.getElementsByClassName(`${rowNum}`)

//     let nbConsecutive = 0 

//     rowCells.forEach(element => element.classList[-1] === playerDiskIdDict[currentPlayer]['diskId'] ? nbConsecutive++ : nbConsecutive = 0);

// if (nbConsecutive = 4) {
// console.log('Victory');
// };


// }
