var kBoardWidth = 9;
var kBoardHeight= 9;
var kPieceWidth = 50;
var kPieceHeight= 50;
var kPixelWidth = 1 + (kBoardWidth * kPieceWidth);
var kPixelHeight= 1 + (kBoardHeight * kPieceHeight);

var gCanvasElement;
var gDrawingContext;
var gMoveCountElem;

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
	var gCanvasElement = canvasElement;
	alert(gCanvasElement);
	gCanvasElement.width = kPixelWidth;
	gCanvasElement.height = kPixelHeight;
	gCanvasElement.addEventListener("click", gOnClick, false);
	gMoveCountElem = moveCountElement;
	alert(gMoveCountElem);
	gDrawingContext = gCanvasElement.getContext("2d");
	if (!resumeGame())
	{
		newGame();
	}
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
