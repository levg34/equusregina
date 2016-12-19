BOARD = {
	x:7,
	y:7
}

// object A equals object B
function equals(a, b) {
	return JSON.stringify(a) === JSON.stringify(b)
}

// random integer between min and max (integer)
function rand(min,max) {
	return Math.floor(Math.random()*(max-min+1)+min)
}

// define classes

// Move
function Move() {} // <-- do we need this ?

Move.moves = [{x:1,y:2},{x:2,y:1},{x:2,y:-1},{x:1,y:-2},{x:-1,y:-2},{x:-2,y:-1},{x:-2,y:1},{x:-1,y:2}]

Move.randomMove = function() {
	var m = rand(0,7)
	return Move.moves[m]
}

Move.move = function(i) {
	return Move.moves[i%8]
}

// Point
function Point(x,y) {
	this.x=x
	this.y=y
}

Point.prototype.inBoard = function() {
	return this.x >= 0 && this.y >= 0 && this.x <= BOARD.x && this.y <= BOARD.y
}

Point.prototype.move = function(m) {
	var res = new Point()

	res.x = this.x+m.x
	res.y = this.y+m.y
	
	if (!res.inBoard()) {
		res = this
	}

	return res
}

Point.prototype.possibleMoves = function() {
	var pmoves = []
	//for (var move in Move.moves) {
	for (var i=0;i<Move.moves.length;++i) {
		var move = Move.moves[i]
		if (!equals(this.move(move),this)) {
			pmoves.push(move)
		}
	}
	return pmoves
}

Point.prototype.distance = function(b) {
	return Math.sqrt(Math.pow(b.x-this.x,2)+Math.pow(b.y-this.y,2))
}

// Route (solution)
function Route() {
	this.moves=[]
}

Route.prototype.addMove = function(m) {
	this.moves.push(m)
}

// Problem
function Problem(start_pt,arr_pt) {
	this.start_pt=start_pt
	this.arr_pt=arr_pt
	this.solutions=[] // Route[]
}

Problem.prototype.solve = function() {
	//TODO: implement solve function
	var route = new Route()
	var C = this.start_pt
	var visitedPoints = []
	visitedPoints.push(C)

	while (!equals(this.arr_pt,C)) {
		// get all the possible moves
		var pmoves = C.possibleMoves()
		// select a random move among the possible ones
		var rmove = pmoves[rand(0,pmoves.length-1)]
		route.addMove(rmove)
		// place C after the move (move C)
		C = C.move(rmove)
		// add C to the list of visited points
		visitedPoints.push(C)
	}

	this.solutions.push(route)
	console.log(visitedPoints)
}

// use them
var A = new Point(2, 5)
var B = new Point(7, 3)
console.log(A)
console.log(B)

var p = new Problem(A,B)
p.solve()
console.log(p)
