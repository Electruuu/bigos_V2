import Player from "./player.js";
export default class Ghost extends Player {
    constructor (id, socket, x=0,y=0) {
        let ghost = true
        super(id, 0, x, y, ghost)
        function corrector(event) {
            let msg = JSON.parse(event.data)
            if (msg.type == 'rmove' && msg.params.id == this.me.id) {
                this.moveTo(msg.params.pos.x, msg.pos.params.pos.y)
            }
        }
        socket.addEventListener("message", corrector)
    }
}