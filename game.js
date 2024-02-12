document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const message = document.getElementById('message');
    let currentPlayer = 1;
    let lastNumber = null;

    function createGrid() {
        for (let i = 2; i < 50; i += 2) {
            const square = document.createElement('div');
            square.classList.add('grid-item');
            square.textContent = i;
            square.addEventListener('click', () => handleMove(square, i));
            grid.appendChild(square);
        }
    }

    function handleMove(square, number) {
        if (lastNumber === null || number % lastNumber === 0 || lastNumber % number === 0) {
            square.classList.add('disabled');
            lastNumber = number;
            currentPlayer = currentPlayer === 1 ? 2 : 1;
            message.textContent = `Player ${currentPlayer}'s turn`;
        } else {
            message.textContent = `Invalid move. Player ${currentPlayer}, choose again.`;
        }

        checkForEndGame();
    }

    function checkForEndGame() {
        const availableMoves = Array.from(document.querySelectorAll('.grid-item:not(.disabled)')).filter(square => {
            const num = parseInt(square.textContent);
            return num % lastNumber === 0 || lastNumber % num === 0;
        });

        if (availableMoves.length === 0) {
            message.textContent = `Game Over. Player ${currentPlayer === 1 ? 2 : 1} wins!`;
        }
    }

    createGrid();
});
