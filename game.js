document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const message = document.getElementById('message');
    let currentPlayer = 1;
    let lastNumber = null;

    function createGrid() {
        for (let i = 1; i <= 100; i++) { // Changed from 2, i < 50, i += 2 to include 1 to 100
            const square = document.createElement('div');
            square.classList.add('grid-item');
            square.textContent = i;
            square.addEventListener('click', () => handleMove(square, i));
            grid.appendChild(square);
        }
    }

    function handleMove(square, number) {
        // Allows the first move to be any number if lastNumber is null
        if (lastNumber === null || number % lastNumber === 0 || lastNumber % number === 0) {
            square.classList.add('disabled');
			// Inside handleMove function, add a class to clicked items
			square.classList.add('clicked');

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
            return lastNumber === null || num % lastNumber === 0 || lastNumber % num === 0;
        });

        if (availableMoves.length === 0) {
            message.textContent = `Game Over. Player ${currentPlayer === 1 ? 2 : 1} wins!`;
        }
    }

    createGrid();
});

