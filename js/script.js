var solveButton = document.getElementById('solve')
var toolOption = document.getElementById('tool')
var bestSolMoves = document.getElementById('nbMinMoves')
var bs = document.getElementById('bs')
var solutions = document.getElementById('solutions')
var solution = document.getElementById('solution')
var selectedSolution = 0

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
		solutions.removeAttribute('hidden')
	}
	solveButton.removeAttribute('disabled')
	
	var minMoves = p.solutions[0].moves.length
	var indexMinMoves = 0
	for (var i in p.solutions) {
		if (p.solutions[i].moves.length<minMoves) {
			minMoves=p.solutions[i].moves.length
			indexMinMoves = i
		}
	}
	bestSolMoves.innerText = minMoves
	
	// add solution to solutions view
    var option = document.createElement('option')
    option.value = p.solutions.length-1
    option.text = 'solution in '+p.solutions[option.value].moves.length+' moves'
    solution.add(option)

	// auto-select best solution
	solution.selectedIndex = indexMinMoves
}

function changeSolution() {
	selectedSolution = solution.value
}

function clickViewSolution() {
	// TODO: view solutions on board
    console.log(p.solutions[selectedSolution])
}