
function stGame(canvasElement, moveCountElement)
{
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
}
