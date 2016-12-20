// get canvas and context
var c1 = document.getElementById('canvas1')
var ctx = c1.getContext('2d')

// draw horizontal lines
var baseY = c1.height/(BOARD.y+1)
for (var i=0;i<BOARD.y;++i) {
    ctx.moveTo(0, baseY+i*baseY); 
    ctx.lineTo(c1.width, baseY+i*baseY)
    ctx.stroke()
}

// draw vertical lines
var baseX = c1.width/(BOARD.x+1)
for (var i=0;i<BOARD.x;++i) {
    ctx.moveTo(baseX+i*baseX, 0); 
    ctx.lineTo(baseX+i*baseX, c1.height)
    ctx.stroke()
}

var pointSize = 40
function drawPoint(p) {
    ctx.fillRect(5+baseX*p.x,5+baseY*p.y,pointSize,pointSize)
}

drawPoint(A)
drawPoint(B)
