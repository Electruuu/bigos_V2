import Sprite from "./sprite.js"

export default class Player {
    /**
     * Class Player Extending Class db and Class sprite .
     * @param {*} id - Player's ID. Default: -1(new ID)
     * @param {WebSocket} socket - WebSocket to Verify is the ID Correct. (Optional).
     * @param {*} x - Player Position X. Default: 0
     * @param {*} y - Player Position Y. Default: 0
     */
    constructor(id=-1, socket=0, x=0, y=0) {
        const cThis = this
        if (socket instanceof WebSocket) {
            socket.send(JSON.stringify({type:'idver',params:{id:id}}))
            id = -2
            function verifyID(event) {
                let mes = event
                if (mes.type=='ridver' && this.me.id==-2) {
                    cThis.me.id = mes.params.id
                }
                console.log(cThis.me.id)
                socket.removeEventListener("message",verifyID)
            }
            socket.addEventListener("message", verifyID)
        }

        this.me = {
            id:id,
            data:{
                pos:{x:x,y:y},
                hp:5,
                add:'...'
            }
        }
        this.sprite = new Sprite({x:this.me.data.pos.x, y:this.me.data.pos.y, textures: ['5Hp_Blue_32x32.png']})
    }
    /**
     * Set Player Posiotion to x, y.
     * @param {int} x - To Which Position Set Player's x to.
     * @param {int} y - To Which Position Set Player's y to.
     */
    moveTo(x, y) {
        this.me.data.pos.x = x
        this.me.data.pos.y = y
        this.sprite.setX(this.me.data.pos.x)
        this.sprite.setY(this.me.data.pos.y)
    }
    /**
     * Move Player Posiotion by x, y.
     * @param {int} x - To How Much Move Player's x Posiotion.
     * @param {int} y - To How Much Move Player's y Posiotion.
     */
    move(x, y) {
        this.me.data.pos.x += x
        this.me.data.pos.y += y
        this.sprite.setX(this.me.data.pos.x)
        this.sprite.setY(this.me.data.pos.y)
    }
}