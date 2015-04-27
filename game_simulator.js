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
