var gCanvasElement;
var gDrawingContext;
var gMoveCountElem;

var gPieces;
var gNumPieces;

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
