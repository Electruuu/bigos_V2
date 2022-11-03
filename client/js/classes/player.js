import Sprite from "./sprite.js"
import Camera from "./camera.js";

export default class Player {
    /**
     * Class Player Extending Class db and Class sprite.
     * @param {*} id - Player's ID. Default: -1(new ID)
     * @param {WebSocket} socket - WebSocket to Verify is the ID Correct. (Optional).
     * @param {*} x - Player Position X. Default: 0
     * @param {*} y - Player Position Y. Default: 0 
     * @param {boolean} ghost - Advised Not to Change, Determines Whether It is Player or After-Image.
     */
    constructor(params) {
        let id = params.id 
        let socket = params.socket || 0
        let x = params.x || 0
        let y = params.y || 0
        let ghost = params.ghost || false
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
                            id:msg.params.id,
                            pos:{x:x,y:y}
                        } 
                    }))
                }
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
        if (!ghost) {
            this.camera = new Camera({x:0,y:0})
            this.camera.follow(this.sprite)
            
            this.dashCD = 0
            this.lastDown = -10000
            this.directions = []
            document.addEventListener("keydown", (key) => {
                let temp = new Date()
                console.log('ouch :P', key.key, temp.getTime()%(10**4))
                if (Math.abs(cThis.lastDown-temp.getTime()%(10**4))/100 < 2 && Math.abs(cThis.lastDown-temp.getTime()%(10**4))/100 > 0.80) {
                    console.log('OUCH "P', Math.abs(cThis.lastDown-temp.getTime()%(10**4))/100)
                    cThis.directions[cThis.directions.length] = "d"+key.key;
                }
                cThis.lastDown = temp.getTime()%(10**4)
                cThis.directions[cThis.directions.length] = key.key
                cThis.directions = Array.from(new Set(cThis.directions))
                console.log(cThis.directions)
            })
            document.addEventListener("keyup", (key) => {
                cThis.directions.splice(cThis.directions.findIndex((arg)=>{if (arg==key.key) {return true}}),1)
                console.log(cThis.directions)
            })
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
    checkMove() {
        this.dashCD = Math.abs(this.dashCD-1)-(this.dashCD-1)
        for (let i in this.directions) {
            switch (this.directions[i]) {
                case 'w':
                    this.move(0,this.me.data.speed)
                    break;
                case 's':
                    this.move(0,-this.me.data.speed)
                    break;
                case 'd':
                    this.move(this.me.data.speed, 0)
                    break;
                case 'a':
                    this.move(-this.me.data.speed, 0)  
                    break; 
                case 'dw':
                    if (!this.dashCD) {
                        for (let a = 3; a>0; a=a/2-0.01) {
                            this.move(0,cThis.me.data.speed*a)
                        }
                        this.dashCD = 200;
                        this.directions.splice(cThis.directions.findIndex((arg)=>{if (arg=='dd') {return true}}),1)
                    }
                    break;
                case 'ds':
                    if (!this.dashCD) {
                        for (let a = 3; a>0; a=a/2-0.01) {
                            this.move(0,-cThis.me.data.speed*a)
                        }
                        this.dashCD = 200;
                        this.directions.splice(cThis.directions.findIndex((arg)=>{if (arg=='dd') {return true}}),1)
                    }
                    break;
                case 'dd':
                    if (!this.dashCD) {
                        for (let a = 3; a>0; a=a/2-0.01) {
                            this.move(cThis.me.data.speed*a,0)
                        }
                        this.dashCD = 200;
                        this.directions.splice(cThis.directions.findIndex((arg)=>{if (arg=='dd') {return true}}),1)
                    }
                    break;
                case 'da':
                    if (!this.dashCD) {
                        for (let a = 3; a>0; a=a/2-0.01) {
                            this.move(-cThis.me.data.speed*a,0)
                        }
                        this.dashCD = 200;
                        this.directions.splice(cThis.directions.findIndex((arg)=>{if (arg=='dd') {return true}}),1)
                    }  
                    
            }
        }

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
    getMove() {
        return this.controls.giveKey()
    }
}