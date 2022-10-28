export default function frameLoop() {
    window.ctx.clearRect(0, 0, window.canvas.width, window.canvas.height)

    document.dispatchEvent(new CustomEvent('drawTick'))

    window.requestAnimationFrame(frameLoop)
}