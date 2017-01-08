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

describe('test helper', function() {
	describe('containsDuplicate', function() {
		var array = []
		it('should return false for a 0 size array', function() {
			assert(!containsDuplicate(array))
		})
		it('should return true if contains duplicates', function() {
			array.push({'a':'b'})
			array.push({'e':'f'})
			array.push({'c':'d'})
			array.push({'a':'b'})
			array.push({'a':'b'})
			assert(containsDuplicate(array))
		})
		it('should return false if does not contain duplicate', function() {
			array = []
			array.push({'a':'b'})
			array.push({'e':'f'})
			array.push({'c':'d'})
			array.push({'g':'h'})
			array.push({'i':'j','a':'b'})
			assert(!containsDuplicate(array))
		})
	})
})

describe('equals()', function() {
	describe('Objects', function() {
		it('equal objects should be equal', function() {
			assert(equals({a:'a',b:'b'},{a:'a',b:'b'}))
		})
		it('different objects should NOT be equal', function() {
			assert(!equals({a:'a',b:'b'},{a:'a',b:'c'}))
		})
		it('different objects should NOT be equal', function() {
			assert(!equals({a:'a',b:'b'},{a:'a',c:'b'}))
		})
	})
	describe('Move', function() {
		it('equal moves should be equal', function() {
			assert(equals(Move.move(3),Move.move(3)))
		})
		it('equal moves should be equal', function() {
			assert(equals(Move.move(3),{x:1,y:-2}))
		})
		it('different moves should NOT be equal', function() {
			assert(!equals(Move.move(2),Move.move(3)))
		})
		it('different moves should NOT be equal', function() {
			assert(!equals(Move.move(2),{x:-1,y:2}))
		})
	})
	describe('Point', function() {
		it('equal points should be equal', function() {
			assert(equals(A,A))
		})
		it('equal points should be equal', function() {
			assert(equals(A,new Point(2, 5)))
		})
		it('different points should NOT be equal', function() {
			assert(!equals(A,B))
		})
		it('different points should NOT be equal', function() {
			assert(!equals(A,new Point(7, 3)))
		})
	})
	describe('Route', function() {
		it('equal routes should be equal', function() {
			assert(equals(routeAA,routeAA))
		})
		it('different routes should NOT be equal', function() {
			assert(!equals(routeAA,routeAB))
		})
	})
})

describe('Point', function() {
	describe('#inBoard', function() {
		it('a point in board should be in board', function() {
			assert(A.inBoard())
		})
		it('a point in board should be in board', function() {
			assert(B.inBoard())
		})
		it('a point out of the board shoud not be in', function() {
			var out = new Point(BOARD.x+1,1)
			assert(!out.inBoard())
		})
		it('a point out of the board shoud not be in', function() {
			var out = new Point(1,-1)
			assert(!out.inBoard())
		})
	})
	describe('#move', function() {
		it('new point corresponding to move', function() {
			assert(equals(new Point(3,7),A.move(Move.move(0))))
		})
		it('new point corresponding to move', function() {
			assert(equals(new Point(3,3),A.move(Move.move(3))))
		})
		it('new point corresponding to move', function() {
			assert(equals(new Point(0,4),A.move(Move.move(5))))
		})
	})
	describe('#possibleMoves', function() {
		var pm
		before(function() {
			pm = A.possibleMoves()
		})
		it('all possible moves stay in board', function() {
			for (var i in pm) {
				assert(A.move(pm[i]).inBoard())
			}
		})
	})
	describe('#route', function() {
		it('routeAA from A should lead to A', function() {
			assert(equals(A,A.route(routeAA)))
		})
		it('routeAB from A should lead to B', function() {
			assert(equals(B,A.route(routeAB)))
		})
		it('routeAA from A should NOT lead to B', function() {
			assert(!equals(B,A.route(routeAA)))
		})
		it('routeAB from A should NOT lead to A', function() {
			assert(!equals(A,A.route(routeAB)))
		})
	})
	describe('#distance', function() {
		it('distance between A and A = 0', function() {
			assert(A.distance(A)==0)
		})
		it('distance working', function() {
			var C = new Point(2,0)
			assert(A.distance(C)==5)
		})
		it('distance working', function() {
			var C = new Point(5,5)
			assert(A.distance(C)==3)
		})
	})
	describe('#diff', function() {
		it('diff between A and A = (0,0)', function() {
			assert(equals(A.diff(A),{x:0,y:0}))
		})
		it('diff working', function() {
			var C = new Point(2,0)
			assert(equals(A.diff(C),{x:0,y:5}))
		})
		it('diff working', function() {
			var C = new Point(5,5)
			assert(equals(A.diff(C),{x:-3,y:0}))
		})
	})
})

describe('Move', function() {
	describe('#move', function() {
		it('move(i) must return move n°i', function() {
			assert(equals(Move.move(3),{x:1,y:-2}))
		})
		it('move(i) must work for i>moves.length', function() {
			assert(equals(Move.move(12),{x:-1,y:-2}))
		})
	})
})

describe('Problem', function() {
	describe('#solveRandom', function() {
		var sols
		before(function() {
			p = new Problem(A,B)
			p.solveRandom()
			sols = p.solutions
		})
		it('there should be at least one solution', function() {
			assert(sols.length>0)
		})
		it('all solutions should lead to B', function() {
			for (var i=0;i<99;++i) {
				p.solveRandom()
			}
			for (var i in sols) {
				var sol = sols[i]
				var C = A.route(sol)
				assert(equals(C,B))
			}
		})
		it('all solutions should not go back', function() {
			for (var i in sols) {
				var sol = sols[i]
				var C = A
				var vp = []
				vp.push(C)
				for (var j in sol.moves) {
					var move = sol.moves[j]
					C = C.move(move)
					vp.push(C)
				}
				// check
				for (var i=2;i<vp.length;++i) {
					assert(!equals(vp[i],vp[i-2]))
				}
			}
		})
	})
	describe('#solve', function() {
		var sols
		before(function() {
			p = new Problem(A,B)
			p.solve()
			sols = p.solutions
		})
		it('there should be one solution', function() {
			assert(sols.length==1)
		})
		it('the solution should lead to B', function() {
			var sol = sols[0]
			var C = A.route(sol)
			assert(equals(C,B))
		})
		it('optimum solution is 3 moves', function() {
			var sol = sols[0]
			assert(sol.moves.length<=3)
		})
	})
	describe('#solveAll', function() {
		var sols
		before(function() {
			p = new Problem(A,B)
			p.solveAll()
			sols = p.solutions
		})
		it('there should be at least one solution', function() {
			assert(sols.length>0)
		})
		it('all solutions should lead to B', function() {
			for (var i in sols) {
				var sol = sols[i]
				var C = A.route(sol)
				assert(equals(C,B))
			}
		})
		it('optimum solution is 3 moves', function() {
			var sol = sols[0]
			assert(sol.moves.length<=3)
		})
		it('all solutions are different', function() {
			assert(!containsDuplicate(sols),'at least one duplicate solution')
		})
	})
})
