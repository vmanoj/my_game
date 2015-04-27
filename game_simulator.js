
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
}
