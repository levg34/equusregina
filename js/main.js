// define classes

// Point
function Point(x,y) {
	this.x=x
	this.y=y
}

// Move
move = [[1,2],[2,1],[2,-1],[1,-2],[-1,-2],[-2,-1],[-2,1],[-1,2]]

// Route (solution)
function Route() {
	this.moves=[]
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
	route.moves.push(move[0])
	route.moves.push(move[1])
	route.moves.push(move[2])
	this.solutions.push(route)
	route = new Route()
	route.moves.push(move[3])
	route.moves.push(move[4])
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
