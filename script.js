// CREATE PLAYERS
const Players = (maker, color) => ({ maker, color })

// GAME FLOW
const Game = (() => {
    // DECLARE VARIABLES
    const boxes = document.querySelectorAll('.option-box')
    const statusTxt = document.querySelector('.statusTxt')
    const restartBtn = document.querySelector('.restart-btn')
    const xPlayer = Players("X", "#7aefd8")
    const oPlayer = Players("O", "#fd9b9b")
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    let options = ["", "", "", "", "", "", "", "", ""]
    let currentPlayer = xPlayer.maker
    let running = false

    // CREATE FUNCTIONS
    function startGame() {
        boxes.forEach(box => box.addEventListener('click', boxClicked))
        restartBtn.addEventListener('click', restartGame)
        statusTxt.style.color = xPlayer.color
        statusTxt.textContent = `${currentPlayer}'s turn`
        running = true
    }

    function boxClicked() {
        const boxIndex = this.getAttribute('boxIndex')
        if (options[boxIndex] != "" || !running) {
            return
        }
        updateBox(this, boxIndex)
        checkWinner()
    }

    function updateBox(box, index) {
        options[index] = currentPlayer
        box.textContent = currentPlayer
    }

    function changePlayer() {
        boxes.forEach(box => {
            box.textContent === xPlayer.maker ? box.style.color = xPlayer.color : box.style.color = oPlayer.color
        })
        currentPlayer === xPlayer.maker ? statusTxt.style.color = oPlayer.color : statusTxt.style.color = xPlayer.color
        currentPlayer = (currentPlayer === xPlayer.maker) ? oPlayer.maker : xPlayer.maker
        statusTxt.textContent = `${currentPlayer}'s turn`
    }

    function checkWinner() {
        let roundWon = false
        for (let i = 0; i < winConditions.length; i++) {
            const condition = winConditions[i]
            const cellA = options[condition[0]]
            const cellB = options[condition[1]]
            const cellC = options[condition[2]]

            if (cellA == "" || cellB == "" || cellC == "") {
                continue
            }
            if (cellA == cellB && cellB == cellC) {
                roundWon = true
                break
            }
        }
        if (roundWon) {
            statusTxt.textContent = `${currentPlayer} wins!`
            running = false
        }
        else if (!options.includes("")) {
            statusTxt.textContent = 'Draw!'
            running = false
        }
        else {
            changePlayer()
        }
    }

    function restartGame() {
        currentPlayer = xPlayer.maker
        options = ["", "", "", "", "", "", "", "", ""]
        statusTxt.textContent = `${currentPlayer}'s turn`
        boxes.forEach(box => box.textContent = "")
        running = true
    }

    return { startGame }
})()

Game.startGame()