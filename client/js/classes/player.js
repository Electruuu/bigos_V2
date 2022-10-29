import Sprite from "./sprite"

export default class player {
    /**
     * Class player Extending Class db and Class sprite .
     * @param {*} id - Player's ID. Default: -1(new ID)
     * @param {WebSocket} socket - WebSocket to Verify is the ID Correct. (Optional).
     * @param {*} x - Player Position X. Default: 0
     * @param {*} y - Player Position Y. Default: 0
     */
    constructor(id=-1, socket=0, x=0, y=0) {
        if (socket instanceof WebSocket) {
            socket.send({val:1,params:{id:id}})
            socket.addEventListener("message", (event) => {
                let mes = event.data
                if (mes.val=-1) {
                    this.me.id = mes.params.id
                }
            })
        }
        this.me = {
            id:id,
            data:{
                pos:{x:x,y:y},
                hp:5,
                add:'...'
            }
        }
        this.sprite = new Sprite({x:this.me.data.pos.x, y:this.me.data.pos.y, textures: ['5Hp_Blue_32x32']})
    }
}