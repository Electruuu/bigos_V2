import Sprite from "./sprite.js"

export default class Player {
    /**
     * Class Player Extending Class db and Class sprite.
     * @param {*} id - Player's ID. Default: -1(new ID)
     * @param {WebSocket} socket - WebSocket to Verify is the ID Correct. (Optional).
     * @param {*} x - Player Position X. Default: 0
     * @param {*} y - Player Position Y. Default: 0
     */
    constructor(id=-1, socket=0, x=0, y=0) {
        const cThis = this
        this.tid = 0;
        let temp = new Date()
        this.tid = ((temp.getTime()-(temp.getTime()/(10**9))%2)*(10**15))%(10**8)
        if (socket instanceof WebSocket) {
            socket.send(JSON.stringify({type:'idver',params:{id:id, tid:this.tid}}))
            id = -2
            function verifyID(event) {
                let msg = JSON.parse(event.data.toString())
                if (msg.type=='ridver' && cThis.me.id==-2 && cThis.tid == msg.params.tid) {
                    cThis.me.id = msg.params.id
                    socket.send(JSON.stringify({
                        type:'adply',
                        params:{
                            id:msg.params.id
                        } 
                    }))
                }
                socket.send(JSON.stringify({type:'test'}))
                console.log(cThis.me.id, msg)
                socket.removeEventListener("messege", verifyID)
            }
            socket.addEventListener("message", verifyID)
        }

        this.me = {
            id:id,
            data:{
                pos:{x:x,y:y},
                hp:5,
                speed: 1,
                add:'...'
            }
        }
        this.sprite = new Sprite({x:this.me.data.pos.x, y:this.me.data.pos.y, textures: [
            '5Hp_Blue_32x32.png',
            'Player_Face_32x32.png',
            'Player_Bottom_32x32.png',
            'Player_Up_32x32.png',
            'Player_Left_32x32.png',
            'Player_Right_32x32.png',
            'Player_Corners_32x32.png'
        ]})
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