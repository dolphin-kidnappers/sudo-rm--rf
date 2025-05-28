const SIZE = 9;
const MINES = 10;
let board = [];
let revealed = [];
let gameOver = false;

function createBoard() {
    board = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
    revealed = Array.from({ length: SIZE }, () => Array(SIZE).fill(false));

    // 지뢰 심기
    let minesPlaced = 0;
    while (minesPlaced < MINES) {
        const x = Math.floor(Math.random() * SIZE);
        const y = Math.floor(Math.random() * SIZE);
        if (board[x][y] !== "M") {
            board[x][y] = "M";
            minesPlaced++;
        }
    }

    // 숫자 채우기
    for (let x = 0; x < SIZE; x++) {
        for (let y = 0; y < SIZE; y++) {
            if (board[x][y] === "M") continue;
            let count = 0;
            for (let dx = -1; dx <= 1; dx++) {
                for (let dy = -1; dy <= 1; dy++) {
                    if (
                        x + dx >= 0 && x + dx < SIZE &&
                        y + dy >= 0 && y + dy < SIZE &&
                        board[x + dx][y + dy] === "M"
                    ) {
                        count++;
                    }
                }
            }
            board[x][y] = count;
        }
    }
}

function renderBoard() {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";
    for (let x = 0; x < SIZE; x++) {
        for (let y = 0; y < SIZE; y++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.x = x;
            cell.dataset.y = y;

            if (revealed[x][y]) {
                cell.classList.add("opened");
                const val = board[x][y];
                if (val === "M") {
                    cell.textContent = "💣";
                    cell.style.background = "#f66";
                } else if (val > 0) {
                    cell.textContent = val;
                }
            }

            cell.addEventListener("click", handleLeftClick);
            cell.addEventListener("contextmenu", handleRightClick);
            boardDiv.appendChild(cell);
        }
    }
}

function handleLeftClick(e) {
    if (gameOver) return;
    const x = parseInt(this.dataset.x);
    const y = parseInt(this.dataset.y);
    openCell(x, y);
    renderBoard();
    checkWin();
}

function handleRightClick(e) {
    e.preventDefault();
    if (gameOver) return;
    const x = parseInt(this.dataset.x);
    const y = parseInt(this.dataset.y);
    const cell = e.target;
    if (!revealed[x][y]) {
        cell.textContent = cell.textContent === "🚩" ? "" : "🚩";
        cell.classList.toggle("flag");
    }
}

function openCell(x, y) {
    if (x < 0 || x >= SIZE || y < 0 || y >= SIZE || revealed[x][y]) return;
    revealed[x][y] = true;
    if (board[x][y] === "M") {
        gameOver = true;
        alert("💥 Game Over");
        revealAll();
    } else if (board[x][y] === 0) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                openCell(x + dx, y + dy);
            }
        }
    }
}

function revealAll() {
    for (let x = 0; x < SIZE; x++) {
        for (let y = 0; y < SIZE; y++) {
            revealed[x][y] = true;
        }
    }
    renderBoard();
}

function checkWin() {
    let safeCells = 0;
    for (let x = 0; x < SIZE; x++) {
        for (let y = 0; y < SIZE; y++) {
            if (!revealed[x][y] && board[x][y] !== "M") {
                return;
            }
            if (revealed[x][y]) safeCells++;
        }
    }
    if (!gameOver) {
        gameOver = true;
        alert("🎉 Your Win!!");
        revealAll();
    }
}

createBoard();
renderBoard();
