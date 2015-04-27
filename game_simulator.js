var kBoardWidth = 9;
var kBoardHeight= 9;
var kPieceWidth = 50;
var kPieceHeight= 50;
var kPixelWidth = 1 + (kBoardWidth * kPieceWidth);
var kPixelHeight= 1 + (kBoardHeight * kPieceHeight);

var gCanvasElement;
var gDrawingContext;
var gMoveCountElem;

var gPieces;
var gNumPieces;
var gSelectedPieceIndex;
var gSelectedPieceHasMoved;
var gMoveCount;
var gGameInProgress;

function stGame(canvasElement, moveCountElement) {
	if (!canvasElement)
	{
		canvasElement = document.createElement("canvas");
		canvasElement.id = "can_id";
		document.body.appendChild(canvasElement);
	}
	if (!moveCountElement)
	{
		moveCountElement = document.createElement("p");
		document.body.appendChild(moveCountElement);
	}
	gCanvasElement = canvasElement;
	gCanvasElement.width = kPixelWidth;
	gCanvasElement.height = kPixelHeight;
	gCanvasElement.addEventListener("click", gOnClick, false);
	gMoveCountElem = moveCountElement;
	gDrawingContext = gCanvasElement.getContext("2d");
	if (!resumeGame())
	{
		newGame();
	}
}

function Cell(row, column)
{
	this.row = row;
	this.column = column;
}

function gOnClick(e)
{
	/* Gets the cursor position and passes the row based on the cursor position */
	var cell = getCursorPosition(e);
	for (var i = 0; i < gNumPieces; i++) 
	{
		if ((gPieces[i].row == cell.row) && (gPieces[i].column == cell.column))
		{
			clickOnPiece(i);
			return;
		}
	}
	clickOnEmptyCell(cell);
}

function getCursorPosition(e) 
{
	/* returns Cell with .row and .column properties */
	var x;
	var y;
	if (e.pageX != undefined && e.pageY != undefined) 
	{
		x = e.pageX;
		y = e.pageY;
	}
	else 
	{
		x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
	}
	x -= gCanvasElement.offsetLeft;
	y -= gCanvasElement.offsetTop;
	x = Math.min(x, kBoardWidth * kPieceWidth);
	y = Math.min(y, kBoardHeight * kPieceHeight);
	var cell = new Cell(Math.floor(y/kPieceHeight), Math.floor(x/kPieceWidth));
	return cell;
}

if (typeof resumeGame != "function") 
{
	saveGameState = function()
	{
		return false;
	}
	resumeGame = function() 
	{
		return false;
	}
}

function newGame() 
{
	/* To generate the row, columns and its properties. */
	gPieces = [new Cell(kBoardHeight - 3, 0),
		new Cell(kBoardHeight - 2, 0),
		new Cell(kBoardHeight - 1, 0),
		new Cell(kBoardHeight - 3, 1),
		new Cell(kBoardHeight - 2, 1),
		new Cell(kBoardHeight - 1, 1),
		new Cell(kBoardHeight - 3, 2),
		new Cell(kBoardHeight - 2, 2),
		new Cell(kBoardHeight - 1, 2)];
	gNumPieces = gPieces.length;
	gSelectedPieceIndex = -1;
	gSelectedPieceHasMoved = false;
	gMoveCount = 0;
	gGameInProgress = true;
	drawBoard();
}

function clickOnEmptyCell(cell) 
{
	if (gSelectedPieceIndex == -1) { return; }
	var rowDiff = Math.abs(cell.row - gPieces[gSelectedPieceIndex].row);
	var columnDiff = Math.abs(cell.column - gPieces[gSelectedPieceIndex].column);
	if ((rowDiff <= 1) && (columnDiff <= 1)) 
	{
		/* we already know that this click was on an empty square,
		   so that must mean this was a valid single-square move */
		gPieces[gSelectedPieceIndex].row = cell.row;
		gPieces[gSelectedPieceIndex].column = cell.column;
		gMoveCount += 1;
		gSelectedPieceIndex = -1;
		gSelectedPieceHasMoved = false;
		drawBoard();
		return;
	}
	if ((((rowDiff == 2) && (columnDiff == 0)) ||
	((rowDiff == 0) && (columnDiff == 2)) ||
	((rowDiff == 2) && (columnDiff == 2))) && 
	isThereAPieceBetween(gPieces[gSelectedPieceIndex], cell)) 
	{
		/* this was a valid jump */
		if (!gSelectedPieceHasMoved) 
		{
			gMoveCount += 1;
		}
		gSelectedPieceHasMoved = true;
		gPieces[gSelectedPieceIndex].row = cell.row;
		gPieces[gSelectedPieceIndex].column = cell.column;
		drawBoard();
		return;
	}
	gSelectedPieceIndex = -1;
	gSelectedPieceHasMoved = false;
	drawBoard();
}

function drawBoard() 
{
	/* The canvas element with all row, column being constructed */
	gDrawingContext.clearRect(0, 0, kPixelWidth, kPixelHeight);
	gDrawingContext.beginPath();
    
	/* vertical lines */
	for (var x = 0; x <= kPixelWidth; x += kPieceWidth) 
	{
		gDrawingContext.moveTo(0.5 + x, 0);
		gDrawingContext.lineTo(0.5 + x, kPixelHeight);
	}
    
	/* horizontal lines */
	for (var y = 0; y <= kPixelHeight; y += kPieceHeight) {
		gDrawingContext.moveTo(0, 0.5 + y);
		gDrawingContext.lineTo(kPixelWidth, 0.5 +  y);
	}
    
	/* draw it! */
	gDrawingContext.strokeStyle = "#ccc";
	gDrawingContext.stroke();
    
	for (var i = 0; i < 9; i++) 
	{
		drawPiece(gPieces[i], i == gSelectedPieceIndex);
	}

	gMoveCountElem.innerHTML = gMoveCount;

	saveGameState();
}

function clickOnPiece(pieceIndex) 
{
	if (gSelectedPieceIndex == pieceIndex) { return; }
	gSelectedPieceIndex = pieceIndex;
	gSelectedPieceHasMoved = false;
	drawBoard();
}
