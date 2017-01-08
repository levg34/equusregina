// global methods

// board dimensions, from 0 to BOARD.{x,y} (add 1 for board size)
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

// shuffle array
function shuffle(a) {
	var j, x, i;
	for (i = a.length; i; i--) {
		j = Math.floor(Math.random() * i);
		x = a[i - 1];
		a[i - 1] = a[j];
		a[j] = x;
	}
}

// define classes

// A Queue object for queue-like functionality over JavaScript arrays.
var Queue = function() {
	this.items = []
}
Queue.prototype.enqueue = function(obj) {
	this.items.push(obj)
}
Queue.prototype.dequeue = function() {
	return this.items.shift()
}
Queue.prototype.isEmpty = function() {
	return this.items.length === 0
}

// Move
function Move() {} // <-- do we need this ?

// all the possible moves
Move.moves = [{x:1,y:2},{x:2,y:1},{x:2,y:-1},{x:1,y:-2},{x:-1,y:-2},{x:-2,y:-1},{x:-2,y:1},{x:-1,y:2}]

Move.randomMove = function() {
	var m = rand(0,7)
	return Move.moves[m]
}

// return move number i, or i%8 if i>7
Move.move = function(i) {
	return Move.moves[i%8]
}

// Route (solution)
function Route() {
	this.moves=[]
}

// add move to route
Route.prototype.addMove = function(m) {
	this.moves.push(m)
}

// get move i in route
Route.prototype.getMove = function(i) {
	return this.moves[i]
}

// Point
function Point(x,y) {
	this.x=x
	this.y=y
}

// point is in board
Point.prototype.inBoard = function() {
	return this.x >= 0 && this.y >= 0 && this.x <= BOARD.x && this.y <= BOARD.y
}

// return new point with coordinates after the move
Point.prototype.move = function(m) {
	var res = new Point()

	res.x = this.x+m.x
	res.y = this.y+m.y
	
	if (!res.inBoard()) {
		res = this
	}

	return res
}

// return a list of possible moves from that point
Point.prototype.possibleMoves = function() {
	var pmoves = []
	for (var i in Move.moves) {
		var move = Move.move(i)
		if (!equals(this.move(move),this)) {
			pmoves.push(move)
		}
	}
	return pmoves
}

// return new point with coordinates after all the moves from the route
Point.prototype.route = function(r) {
	var res = new Point(this.x,this.y)
	
	for (var i in r.moves) {
		res = res.move(r.getMove(i))
	}
	
	return res
}

// returns the distance between this point and another point
Point.prototype.distance = function(b) {
	return Math.sqrt(Math.pow(b.x-this.x,2)+Math.pow(b.y-this.y,2))
}

// difference between two points
Point.prototype.diff = function (b) {
	var dx = this.x - b.x
	var dy = this.y - b.y
	return {x:dx,y:dy}
}

// Problem
function Problem(start_pt,arr_pt) {
	this.start_pt=start_pt
	this.arr_pt=arr_pt
	this.solutions=[] // Route[]
}

// solve the problem randomly, fill in this.solutions
Problem.prototype.solveRandom = function() {
	var route = new Route()
	var C = this.start_pt
	var visitedPoints = []
    visitedPoints.push(C)

	while (!equals(this.arr_pt,C)) {
		// get all the possible moves
		var pmoves = C.possibleMoves()
		// remove move if returns to previous position
		if (visitedPoints.length>1) {
			for (var i in pmoves){
				var pm = pmoves[i]
				if (equals(C.move(pm),visitedPoints[visitedPoints.length-2])) {
					pmoves.splice(i,1)
				}
			}
		}
		// select a random move among the possible ones
		var rmove = pmoves[rand(0,pmoves.length-1)]
		route.addMove(rmove)
		// place C after the move (move C)
		C = C.move(rmove)
		visitedPoints.push(C)
	}

	this.solutions.push(route)
}

// find one of the shortest path to solve the problem
Problem.prototype.solve = function() {
    var route = new Route()
    var C = this.start_pt
	var visitedPoints = []
	var queue = new Queue()
	queue.enqueue({point:C})
	visitedPoints.push(C)

	var tree = new Tree(C)

	while (!queue.isEmpty()&&!equals(this.arr_pt,C)) {
		var resC = queue.dequeue()
		C = resC.point
		if (resC.parent) {
			tree.add(C,resC.parent,tree.traverseBF)
		}
		// get all the possible moves
		var pmoves = C.possibleMoves()
		shuffle(pmoves)
		for (var i in pmoves){
			var pm = pmoves[i]
			var D = C.move(pm)
			if (visitedPoints.filter(function(P){ return equals(P,D) }).length==0) {
				queue.enqueue({point:D,parent:C})
				visitedPoints.push(D)
			}
		}
	}

	var leafB
	tree.traverseBF(function(node){leafB=node})

	var pointsList = []
	pointsList.push(leafB.data)

	while(leafB.parent) {
		pointsList.push(leafB.parent.data)
		leafB = leafB.parent
	}

	pointsList.reverse()

	for (var i=0;i<pointsList.length-1;++i) {
		route.addMove(pointsList[i+1].diff(pointsList[i]))
	}

    this.solutions.push(route)
}

// find all the solutions of depth n
Problem.prototype.solveAll = function(n) {
	// TODO: implement
	// we need to fix a max depth
}
