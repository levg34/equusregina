var assert = chai.assert

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
	routeAA.addMove(Move.move(0))
	routeAA.addMove(Move.move(4))
	// route from A to B
	routeAB = new Route()
	routeAB.moves = [{x:2,y:-1},{x:1,y:-2},{x:2,y:1}]

	p = new Problem(A,B)
}

describe("equals()", function() {
	describe("Objects", function() {
		it("equal objects should be equal", function() {
			assert(equals({a:'a',b:'b'},{a:'a',b:'b'}))
		})
		it("different objects should NOT be equal", function() {
			assert(!equals({a:'a',b:'b'},{a:'a',b:'c'}))
		})
		it("different objects should NOT be equal", function() {
			assert(!equals({a:'a',b:'b'},{a:'a',c:'b'}))
		})
	})
	describe("Move", function() {
		it("equal moves should be equal", function() {
			assert(equals(Move.move(3),Move.move(3)))
		})
		it("equal moves should be equal", function() {
			assert(equals(Move.move(3),{x:1,y:-2}))
		})
		it("different moves should NOT be equal", function() {
			assert(!equals(Move.move(2),Move.move(3)))
		})
		it("different moves should NOT be equal", function() {
			assert(!equals(Move.move(2),{x:-1,y:2}))
		})
	})
	describe("Point", function() {
		it("equal points should be equal", function() {
			assert(equals(A,A))
		})
		it("equal points should be equal", function() {
			assert(equals(A,new Point(2, 5)))
		})
		it("different points should NOT be equal", function() {
			assert(!equals(A,B))
		})
		it("different points should NOT be equal", function() {
			assert(!equals(A,new Point(7, 3)))
		})
	})
	describe("Route", function() {
		it("equal routes should be equal", function() {
			assert(equals(routeAA,routeAA))
		})
		it("different routes should NOT be equal", function() {
			assert(!equals(routeAA,routeAB))
		})
	})
})

describe("Point", function() {
	describe("#route", function() {
		it("routeAA from A should lead to A", function() {
			assert(equals(A,A.route(routeAA)))
		})
		it("routeAB from A should lead to B", function() {
			assert(equals(B,A.route(routeAB)))
		})
		it("routeAA from A should NOT lead to B", function() {
			assert(!equals(B,A.route(routeAA)))
		})
		it("routeAB from A should NOT lead to A", function() {
			assert(!equals(A,A.route(routeAB)))
		})
	})
})

describe("Problem", function() {
	describe("#solve", function() {
		var sols
		before(function() {
			p.solve()
			sols = p.solutions
		});
		it("there should be at least one solution", function() {
			assert(sols.length>0)
		})
		it("all solutions should lead to B", function() {
			for (var i in sols) {
				var sol = sols[i]
				var C = A.route(sol)
				assert(equals(C,B))
			}
		})
	})
})
