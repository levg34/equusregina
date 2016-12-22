// test main.js
var body = document.getElementsByTagName('body')[0]

var A
var B
var routeAA
var routeAB
var p

function init() {
	A = new Point(2, 5)
	B = new Point(7, 3)
	
	// route from A to A
	routeAA = new Route()
	// route from A to B
	routeAB = new Route()
	
	p = new Problem(A,B)
}
// test equals()
function testEquals() {
	// Object
	equals({a:'a',b:'b'},{a:'a',b:'b'}) // true
	equals({a:'a',b:'b'},{a:'a',b:'c'}) // false
	equals({a:'a',b:'b'},{a:'a',c:'b'}) // false
	// Move
	equals(Move.move(3),Move.move(3)) // true
	equals(Move.move(3),{x:1,y:-2}) // true
	equals(Move.move(2),Move.move(3)) // false
	equals(Move.move(2),{x:-1,y:2}) // false
	// Point
	equals(A,A) // true
	equals(A,new Point(2, 5)) // true
	equals(A,B) // false
	equals(A,new Point(7, 3)) // false
	// Route
	equals(routeAA,routeAA) //true
	equals(routeAA,routeAB) // false
}

// test Point.route()
function testPointRoute() {
	equals(A,A.route(routeAA)) // true
	equals(B,A.route(routeAB)) // true
	equals(B,A.route(routeAA)) // false
	equals(A,A.route(routeAB)) // false
}

// test Problem.solve()
function testProblemSolve() {
	var res = true
	// calculate route and check final point for each solution (Route)
	p.solve()
	var sols = p.solutions
	sols.length>0 // true
	for (var i in sols) {
		var sol = sols[i]
		var C = A.route(sol)
		equals(C,B) // true
	}
}

function dispayTest() {
	//
}

// launch tests
function launchTests() {
	init()
	testEquals()
	testPointRoute()
	testProblemSolve()
}
