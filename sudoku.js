window.onload = function () {

    const board = document.getElementById("sudoku-board");
    const message = document.getElementById("message");
    const checkBtn = document.getElementById("checkBtn");
    const resetBtn = document.getElementById("resetBtn");

    const puzzle = [
        [5,3,0,0,7,0,0,0,0],
        [6,0,0,1,9,5,0,0,0],
        [0,9,8,0,0,0,0,6,0],
        [8,0,0,0,6,0,0,0,3],
        [4,0,0,8,0,3,0,0,1],
        [7,0,0,0,2,0,0,0,6],
        [0,6,0,0,0,0,2,8,0],
        [0,0,0,4,1,9,0,0,5],
        [0,0,0,0,8,0,0,7,9]
    ];

    const solution = [
        [5,3,4,6,7,8,9,1,2],
        [6,7,2,1,9,5,3,4,8],
        [1,9,8,3,4,2,5,6,7],
        [8,5,9,7,6,1,4,2,3],
        [4,2,6,8,5,3,7,9,1],
        [7,1,3,9,2,4,8,5,6],
        [9,6,1,5,3,7,2,8,4],
        [2,8,7,4,1,9,6,3,5],
        [3,4,5,2,8,6,1,7,9]
    ];

    function createBoard() {
        board.innerHTML = "";
        message.textContent = "";

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                const cell = document.createElement("input");
                cell.type = "text";
                cell.maxLength = 1;
                cell.classList.add("cell");

                if (puzzle[i][j] !== 0) {
                    cell.value = puzzle[i][j];
                    cell.disabled = true;
                    cell.classList.add("prefilled");
                }

                cell.addEventListener("input", () => {
                    if (!/^[1-9]$/.test(cell.value)) {
                        cell.value = "";
                    }
                });

                board.appendChild(cell);
            }
        }
    }

    function checkSudoku() {
        const cells = document.querySelectorAll(".cell");
        let index = 0;

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (!cells[index].disabled) {
                    if (cells[index].value == "" || Number(cells[index].value) !== solution[i][j]) {
                        message.textContent = "Incorrect solution";
                        message.style.color = "red";
                        return;
                    }
                }
                index++;
            }
        }

        message.textContent = "Sudoku Solved!";
        message.style.color = "green";
    }

    checkBtn.onclick = checkSudoku;
    resetBtn.onclick = createBoard;

    createBoard();
};
