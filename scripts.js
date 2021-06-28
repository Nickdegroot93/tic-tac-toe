// Factory Function to create player
const createPlayer = (name, sign) => {
	return { name, sign };
};

const game = (() => {
	// Create players
	const playerOne = createPlayer('Player One', 'x');
	const playerTwo = createPlayer('Player Two', 'o');

	// Initial Values
	let currentPlayer = playerOne;
	let squaresRemaining = 9;
	let winner = false;

	// next player
	function nextPlayer() {
		this.currentPlayer === playerOne
			? (this.currentPlayer = playerTwo)
			: (this.currentPlayer = playerOne);
	}

	const winningDigits = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	function checkWin() {
		winningDigits.forEach((item) => {
			if (
				Gameboard.board[item[0]] == this.currentPlayer.sign &&
				Gameboard.board[item[1]] == this.currentPlayer.sign &&
				Gameboard.board[item[2]] == this.currentPlayer.sign
			) {
				this.winner = true;
			}
		});
	}

	return {
		playerOne,
		playerTwo,
		currentPlayer,
		squaresRemaining,
		winner,
		nextPlayer,
		checkWin,
	};
})();

// GAMEBOARD
const Gameboard = (() => {
	const squares = document.querySelector('.squares');
	const reset = document.querySelector('#reset-btn');
	const startGame = document.querySelector('#play-btn');
	const topPlayerText = document.querySelector('.upper-text-box');

	// On click play button
	startGame.addEventListener('click', () => {
		startGame.classList.toggle('active');
		reset.classList.add('active');
		init();
	});

	// On click reset button
	reset.addEventListener('click', init);

	let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];

	// Initialize board and print;
	function init() {
		clearBoard();
		printBoard(board);
		topPlayerText.innerHTML = `- ${game.currentPlayer.name}'s turn -`;
		game.currentPlayer = game.playerOne;
		game.squaresRemaining = 9;
		game.winner = false;
		clickSquares();
	}

	// Display the board
	function printBoard(array) {
		array.forEach(() => {
			const square = document.createElement('div');
			square.classList = 'square';
			squares.appendChild(square);
		});
	}

	// Clear the board
	function clearBoard() {
		Array.from(squares.children).forEach(() => {
			while (squares.firstChild) {
				squares.removeChild(squares.lastChild);
			}
		});
		for (let i = 0; i < Gameboard.board.length; i++) {
			Gameboard.board[i] = 0;
		}
	}

	// On clicking a square
	function clickSquares() {
		Array.from(squares.children).forEach((square, index) => {
			square.addEventListener('click', () => {
				// Update array to current player sign
				board[index] = game.currentPlayer.sign;
				// Make the square non-clickable
				square.style.pointerEvents = 'none';
				square.style.cursor = 'pointer';
				// Update the board
				const sign = document.createElement('img');
				if (board[index] == 0) {
					return;
				} else if (board[index] == 'x') {
					sign.setAttribute('id', 'svg');
					sign.setAttribute('src', 'x.svg');
					square.appendChild(sign);
				} else if (board[index] == 'o') {
					sign.setAttribute('id', 'svg');
					sign.setAttribute('src', 'o.svg');
					square.appendChild(sign);
				}
				// Decrease remaining squares
				game.squaresRemaining--;
				// Check for a winner
				game.checkWin();
				// Switch to next player if winner is false
				if (game.winner == false) {
					if (game.squaresRemaining > 0) {
						game.nextPlayer();
						topPlayerText.innerHTML = `- ${game.currentPlayer.name}'s turn-`;
					} else {
						topPlayerText.innerHTML = `- It's a tie -`;
					}
				} else if (game.winner == true) {
					topPlayerText.innerHTML = `- ${game.currentPlayer.name} has won -`;
					Array.from(squares.children).forEach((square) => {
						square.style.pointerEvents = 'none';
						square.style.cursor = 'pointer';
					});
				}
			});
		});
	}
	return { board };
})();
