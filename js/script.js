var solveButton = document.getElementById('solve')
var toolOption = document.getElementById('tool')
var bestSolMoves = document.getElementById('nbMinMoves')
var bs = document.getElementById('bs')

var A
var B
var p

var readyToSolve = false

function changeTool() {
	var tool = toolOption.value
	switch(tool) {
		case 'A':
			// TODO get click coordinates
			A = new Point(2, 5)
			drawPoint(A)
			if (B) {
				readyToSolve=true
			}
			break;
		case 'B':
			// TODO get click coordinates
			B = new Point(7, 3)
			drawPoint(B)
			if (A) {
				readyToSolve=true
			}
			break;
		default:
			// default
	}
	if (readyToSolve) {
		toolOption.setAttribute('disabled','')
		solveButton.removeAttribute('disabled')
		p = new Problem(A,B)
	} // not here
}

function clickSolve() {
	solveButton.setAttribute('disabled','')
	p.solve()
	if (solveButton.innerText == 'Solve') {
		solveButton.innerText = 'Solve again'
		bs.removeAttribute('hidden')
	}
	solveButton.removeAttribute('disabled')
	
	var minMoves = p.solutions[0].moves.length
	for (var i in p.solutions) {
		if (p.solutions[i].moves.length<minMoves) {
			minMoves=p.solutions[i].moves.length
		}
	}
	bestSolMoves.innerText = minMoves
	
	// TODO
}