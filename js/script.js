var solveButton = document.getElementById('solve')
var toolOption = document.getElementById('tool')
var bestSolMoves = document.getElementById('nbMinMoves')
var bs = document.getElementById('bs')
var solutions = document.getElementById('solutions')
var solution = document.getElementById('solution')
var viewSolutionsButton = document.getElementById('clickViewSolution')
var showNextStepButton = document.getElementById('showNextStep')
var setup = true
var selectedTool = 'none'
var selectedSolution = 0

var A
var B
var p

var readyToSolve = false

function validateSetup() {
	if (readyToSolve) {
		toolOption.setAttribute('disabled','')
		solveButton.removeAttribute('disabled')
		p = new Problem(A,B)
		setup = false
	}
}

function changeTool() {
	selectedTool = toolOption.value
}

function clickSolve() {
	//solveButton.setAttribute('hidden','')
	solveButton.setAttribute('disabled','')
	p.solve()
	if (solveButton.innerText == 'Solve') {
		setup = false
		solveButton.innerText = 'Solve again'
		bs.removeAttribute('hidden')
		solutions.removeAttribute('hidden')
	}
	solveButton.removeAttribute('disabled')
	
	var minMoves = p.solutions[0].moves.length
	for (var i in p.solutions) {
		if (p.solutions[i].moves.length<minMoves) {
			minMoves=p.solutions[i].moves.length
		}
	}
	bestSolMoves.innerText = minMoves
	
	// add solution to solutions view
	var option = document.createElement('option')
	option.value = p.solutions.length-1
	option.text = 'solution in '+p.solutions[option.value].moves.length+' moves'
	solution.add(option)
}

function resetBoard() {
	for (var i=0;i<=BOARD.x;++i) {
		for (var j=0;j<=BOARD.y;++j) {
			deletePoint(new Point(i,j))
		}
	}
	if (A) {
		drawPoint(A)
	}
	if (B) {
		drawPoint(B)
	}
	viewSolutionsButton.removeAttribute('disabled')
	showNextStepButton.setAttribute('hidden','')
}

function changeSolution() {
	selectedSolution = solution.value
	// cleanup displayed solution
	resetBoard();
}

function StateMove(step,C) {
	this.step = 0
	this.C = new Point(A.x,A.y)
}

// save progress of displaying move
var stateMove

function showNextStep() {
	var smoves = p.solutions[selectedSolution].moves
	var C = stateMove.C
	var i = stateMove.step
	drawMove(C, smoves[i])
	if (equals(C,A)) {
		drawPointColor(A, 'green')
	}
	stateMove.C = C.move(smoves[i])
	if (i<smoves.length-1) {
		++stateMove.step
	} else {
		viewSolutionsButton.removeAttribute('disabled')
		showNextStepButton.setAttribute('hidden','')
	}

}

function clickViewSolution() {
	resetBoard()
	stateMove = new StateMove()
	showNextStep()
	if (p.solutions[selectedSolution].moves.length>1) {
		viewSolutionsButton.setAttribute('disabled','')
		showNextStepButton.removeAttribute('hidden')
	}
}

function getPos(elem) {
	var screenPosition = elem.getBoundingClientRect()
	return {x:screenPosition.left,y:screenPosition.top}
}

function clickCanvas(e) {
	var x = e.clientX
	var y = e.clientY

	var pos = getPos(c1)
	x = x-pos.x
	y = y-pos.y

	if (setup) {
		var tool = toolOption.value
		switch(tool) {
			case 'A':
				if (!A) {
					A = calcPointFromBoardClick(x,y)
					drawPoint(A)
				}
				if (B) {
					readyToSolve=true
				}
				break;
			case 'B':
				if (!B) {
					B = calcPointFromBoardClick(x,y)
					drawPoint(B)
				}
				if (A) {
					readyToSolve=true
				}
				break;
			default:
				// default
				console.log(calcPointFromBoardClick(x,y))
		}
		validateSetup()
	}
}

c1.addEventListener("click", clickCanvas)
