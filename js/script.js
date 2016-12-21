// use them (main.js)
var A = new Point(2, 5)
var B = new Point(7, 3)
console.log(A)
console.log(B)

var p = new Problem(A,B)
p.solve()
console.log(p)

// use them (draw.js)
drawPoint(A)
drawPoint(B)

drawPossibleMoves(A)
drawPossibleMovesColor(B,"green")

// other
function addPoint(p) {
	// TODO
	drawPoint(p)
}
