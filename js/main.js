BOARD = {
	x:7,
	y:7
}

function equals(a, b) {
	return JSON.stringify(a) === JSON.stringify(b)
}

// define classes

// Move
function Move() {
	//
}

Move.prototype.moves = [{x:1,y:2},{x:2,y:1},{x:2,y:-1},{x:1,y:-2},{x:-1,y:-2},{x:-2,y:-1},{x:-2,y:1},{x:-1,y:2}]

Move.prototype.randomMove = function() {
	var m = Math.floor(Math.random() * 8)
	return this.moves[m]
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
	var solved = false
	var C = this.start_pt

	do {
		var rmove = new Move().randomMove()
		//if (!equals(C.move(rmove),C)) {
			route.addMove(rmove)
			C = C.move(rmove)
		//}
		solved = equals(this.arr_pt,C)
	} while (!solved);

	this.solutions.push(route)
}

// use them
var A = new Point(2, 5)
var B = new Point(7, 3)
console.log(A)
console.log(B)

var p = new Problem(A,B)
p.solve()
console.log(p)
