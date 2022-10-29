export default function initCanvas() {
    
    window.canvas = document.getElementById('main')
    window.ctx = window.canvas.getContext('2d')

    window.canvas.width = window.innerWidth-160
    window.canvas.height = (window.innerWidth-160)/16*9
}