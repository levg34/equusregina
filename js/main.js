function equals(a, b) {
	JSON.stringify(a) === JSON.stringify(b)
}

// define classes

// Point
function Point(x,y) {
	this.x=x
	this.y=y
}

Point.prototype.move = function(m) {
	var res = new Point()

	res.x = this.x+m.x
	res.y = this.y+m.y

	return res
}

// Move
Move = [{x:1,y:2},{x:2,y:1},{x:2,y:-1},{x:1,y:-2},{x:-1,y:-2},{x:-2,y:-1},{x:-2,y:1},{x:-1,y:2}]

function randomMove() {
	var m = Math.floor(Math.random() * 8)
	return Move[m]
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
		var rmove = randomMove()
		route.addMove(rmove)
		C = C.move(rmove)
		console.log(C)
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
console.log(p)
p.solve()
console.log(p)
p.solve()
console.log(p)

console.log(randomMove())
console.log(randomMove())
console.log(randomMove())
console.log(randomMove())
console.log(randomMove())
console.log(randomMove())
console.log(randomMove())
console.log(randomMove())
console.log(randomMove())
console.log(randomMove())
