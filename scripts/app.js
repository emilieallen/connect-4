
function init() {
    // DOM
    const grid = document.querySelector(".grid") // get this with querySelector
    const start = null // get this with querySelector
    const scoreDisplay = document.getElementById("score-display")// get this with querySelector

    const rawCount = 6
    const colCount = 7
    
    // let score = 0;
    let currentPlayer = '';

    const playerDiskIdDict = {
        'player-1': {'diskId': 'firstPlayerDisk', 'name': '', 'score': 0},
        'player-2': {'diskId': 'secondPlayerDisk', 'name': '', 'score': 0}
    };

    // scoreDisplay.innerHTML = score;
    
    const cellPositionDict = {};

    const displayScore = () => {
        document.getElementById("player1score").innerText = `${playerDiskIdDict['player-1']['name']}: ${playerDiskIdDict['player-1']['score']}`;
        document.getElementById("player2score").innerText = `${playerDiskIdDict['player-2']['name']}: ${playerDiskIdDict['player-2']['score']}`;
    }

    /**
     * @name hash
     * @description Random hashing algorithm I found on Stack Overflow.
     * @param {string} str 
     * @param {boolean} asString 
     * @param {*} seed 
     * 
     * @returns {string} hash
     */
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
        document.getElementById("player1score").style.backgroundColor = 'red';
    };

    const nextPlayer = () => {
        currentPlayer === 'player-1' ? currentPlayer = 'player-2' : currentPlayer = 'player-1';

        if (currentPlayer === 'player-1') {
            document.getElementById("player1score").style.backgroundColor = 'red';
            document.getElementById("player2score").style.backgroundColor = '';
        }
        if (currentPlayer === 'player-2') {
            document.getElementById("player1score").style.backgroundColor = '';
            document.getElementById("player2score").style.backgroundColor = 'red';
        }

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
                        playerDiskIdDict[currentPlayer]['score'] ++;
                        displayScore();
                        displayWinner();
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

    document.getElementById("submitNames").addEventListener("click", function() {
        const fInput = document.getElementById("fname").value;
        const sInput = document.getElementById("lname").value;

        if (fInput && sInput) {
            playerDiskIdDict['player-1']['name'] = fInput;
            playerDiskIdDict['player-2']['name'] = sInput;
            modal.style.display = "none";
            displayScore();
        } else {
            window.alert('Please provide both names !');
        }

    });

    const resetInputs = () => {
        result = window.confirm('Are you sure you want to reset the game?');
        if (result) {
            document.getElementById("fname").value = '';
            document.getElementById("lname").value = '';
            playerDiskIdDict['player-1']['score'] = 0;
            playerDiskIdDict['player-2']['score'] = 0;
            playerDiskIdDict['player-1']['name'] = '';
            playerDiskIdDict['player-2']['name'] = '';
            modal.style.display = "block";
            document.getElementById("modal2").style.display = "none";
            document.getElementById("modal1").style.display = "block";
            initialisePlayer();
        }
    }

    document.getElementById("resetBtn").addEventListener("click", resetInputs);
    document.getElementById("reset-game").addEventListener("click", resetInputs);

    const continuePlaying = () => {
        document.getElementById("modal2").style.display = "none";
        modal.style.display = "none";
        initialisePlayer();

    }

    document.getElementById("keep-playing").addEventListener("click", continuePlaying);

    function displayWinner() {
        modal.style.display = "block";
        document.getElementById("modal1").style.display = "none";
        document.getElementById("modal2").style.display = "block";
        document.getElementById("congrats").innerHTML = `&#127882 ${playerDiskIdDict[currentPlayer]['name']} Wins !! `;

        // if (playerDiskIdDict['player-1']['score'] > playerDiskIdDict['player-2']['score']) {
        //     document.getElementById("congrats").innerHTML = `&#127882 ${playerDiskIdDict['player-1']['name']} Wins !! `;
        // } else if ((playerDiskIdDict['player-1']['score'] === playerDiskIdDict['player-2']['score'])) {
        //     document.getElementById("congrats").innerHTML = "It's a tie !!"
        // } else {
        //     document.getElementById("congrats").innerHTML = `&#127882 ${playerDiskIdDict['player-2']['name']} Wins !! `;
        // }
        

    }
    // create the grid
    createGrid();
  
  }
  
  document.addEventListener('DOMContentLoaded', init)
