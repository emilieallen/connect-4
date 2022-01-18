function init() {
    // DOM
    const grid = document.querySelector(".grid") // get this with querySelector
    const start = null // get this with querySelector
    const scoreDisplay = document.getElementById("score-display")// get this with querySelector
  
    // const gridCellCount = 6 * 7
    const rawCount = 6
    const colCount = 7
    
    let score = 0;
    let currentPlayer = '';

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
        initialisePlayer();
        console.log(currentPlayer);
      }

    const initialisePlayer = () => {
        currentPlayer = 'player-1';
    };

    const nextPlayer = () => {
        currentPlayer === 'player-1' ? currentPlayer = 'player-2' : currentPlayer = 'player-1';
        console.log(currentPlayer);
    };

    const resetGrid = () => {
        for (let i=1; i<=42; i++){
            const cellClassList = document.getElementById(`${i}`).classList;
            if (!cellClassList.contains('freeDisk')) {
                cellClassList.remove(`${cellClassList[2]}`);
                cellClassList.add('freeDisk');
            };
        };
    }

    // const startGame = () => {
    //     initialisePlayer();
    // };


    const leftDiagonalCells = (classList) => {
        let x = Number(classList[0][1]);
        let y = Number(classList[1][1]);
        let iMin = Math.max(1, x - y + 1);
        let iMax = Math.min(7, x - y + 6);

        let result = []; 
        for (let i=iMin; i<=iMax;i++) {
            result.push(`.x${i}.y${i + y - x}`);
        }
        result = result.join();
        
        return document.querySelectorAll(result);
    };

    const rightDiagonalCells = (classList) => {
        let x = Number(classList[0][1]);
        let y = Number(classList[1][1]);
        let iMin = Math.max(1, x + y - 6);
        let iMax = Math.min(7, x + y - 1);

        let result = []; 
        for (let i=iMin; i<=iMax;i++) {
            result.push(`.x${i}.y${x + y - i}`);
        }
        result = result.join();
        
        return document.querySelectorAll(result);
    };


    function straightConsecutiveOccurence(classList) {
        function getScore(array) {
            const player = playerDiskIdDict[currentPlayer]['diskId'];
            let number = 0;
            [...array].forEach(element => {
                if (number < 4 && element.classList[2] === player) {
                    number++;
                    if (number === 4) {
                        console.log('Victory');
                        resetGrid();
                    };
                } else {
                    number = 0;
                }});
            return number;
        }
    
        var obj = {
            'hScore': getScore(document.getElementsByClassName(classList[1])),
            'vScore': getScore(document.getElementsByClassName(classList[0])),
            'rDiagScore': getScore(rightDiagonalCells(classList)),
            'lDiagScore': getScore(leftDiagonalCells(classList))
          };
    };


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
    };
  
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal

    document.getElementById("startBtn").addEventListener("click", function() {
        console.log('clicked');
        modal.style.display = "block";
    });

    // Get the <span> element that closes the modal
    document.getElementsByClassName("close")[0].addEventListener("click", function() {
        console.log('close');
        modal.style.display = "none";
    })

    // When the user clicks on the button, open the modal
    // btn.onclick = function() {
    //     modal.style.display = "block";
    // }

    // When the user clicks on <span> (x), close the modal
    // span.onclick = function() {
    //     modal.style.display = "none";
    // }

    // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function(event) {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //  }
    // }
    // create the grid
    createGrid();
    
    // // start the game when the user clicks the start game button
    // document.getElementById("start").addEventListener("click", startGame);
  
  }
  
  document.addEventListener('DOMContentLoaded', init)
