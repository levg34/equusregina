// get canvas and context
var c1 = document.getElementById('canvas1')
var ctx = c1.getContext('2d')
ctx.save()

// draw horizontal lines
var baseY = c1.height/(BOARD.y+1)
for (var i=0;i<BOARD.y;++i) {
	ctx.moveTo(0, baseY+i*baseY)
	ctx.lineTo(c1.width, baseY+i*baseY)
	ctx.stroke()
}

// draw vertical lines
var baseX = c1.width/(BOARD.x+1)
for (var i=0;i<BOARD.x;++i) {
	ctx.moveTo(baseX+i*baseX, 0)
	ctx.lineTo(baseX+i*baseX, c1.height)
	ctx.stroke()
}

// draw point function
var borderPSX = baseX/10
var borderPSY = baseY/10
var pointSizeX = baseX-2*borderPSX
var pointSizeY = baseY-2*borderPSY
function drawPoint(p) {
	ctx.fillRect(borderPSX+baseX*p.x,borderPSY+baseY*p.y,pointSizeX,pointSizeY)
}

// draw possible points to wich we can move from point p, 
// those points will be drawn in color color
function drawPossibleMovesColor(p,color) {
	ctx.fillStyle=color
	var pm = p.possibleMoves()
	for (var i in pm) {
		drawPoint(p.move(pm[i]))
	}
	ctx.restore()
}
function drawPossibleMoves(p) {
	drawPossibleMovesColor(p,'#FF0000')
}
