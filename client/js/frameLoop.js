let previousTimeStamp

export default function frameLoop(timestamp) {
    const delta = timestamp - previousTimeStamp;

    window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height)

    document.dispatchEvent(new CustomEvent('drawTick', {detail: {delta: delta}}))
    
    previousTimeStamp = timestamp
    window.requestAnimationFrame(frameLoop)
    //console.log(timestamp,previousTimeStamp,delta)
}