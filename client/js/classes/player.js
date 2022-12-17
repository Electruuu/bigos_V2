import Sprite from "./sprite.js"
import Camera from "./camera.js";

export default class Player {
    /**
     * Class Player Extending Class db and Class sprite.
     * @param {*} id - Player's ID. Default: -1(new ID)
     * @param {WebSocket} socket - WebSocket to Verify is the ID Correct. (Optional).
     * @param {MapManager} mapManager - MapManager.
     * @param {*} x - Player Position X. Default: 0
     * @param {*} y - Player Position Y. Default: 0 
     * @param {boolean} ghost - Advised Not to Change, Determines Whether It is Player or After-Image.
     */
    constructor(params) {
        let id = params.id 
        this.socket = params.socket || 0
        this.mapManager = params.mapManager
        let x = params.x || 0
        let y = params.y || 0
        let ghost = params.ghost || false
        const cThis = this
        this.tid = 0;
        let temp = new Date()
        this.tid = ((temp.getTime()-(temp.getTime()/(10**9))%2)*(10**15))%(10**8)
        if (this.socket instanceof WebSocket) {
            this.socket.send(JSON.stringify({type:'idver',params:{id:id, tid:this.tid}}))
            this.socket.send(JSON.stringify({type:'getlob'}))
            id = -2
            function verifyID(event) {
                let msg = JSON.parse(event.data.toString())
                if (msg.type=='ridver' && cThis.me.id==-2 && cThis.tid == msg.params.tid) {
                    cThis.me.id = msg.params.id
                    cThis.socket.send(JSON.stringify({
                        type:'adply',
                        params:{
                            id:msg.params.id,
                            pos:{x:x,y:y}
                        } 
                    }))
                }
                else if (msg.type=='rgetlob') {
                    if (!ghost) {

                        console.log(msg.params)

                        // cThis.mapManager.loadMap(
                        //     [{"type":"wall","x":[15,20,25,32.5,30,32.5,30,25,15,20,22.5,27.5,17.5,37.5,35],"y":[30,30,30,30,30,32.5,32.5,32.5,32.5,32.5,30,30,30,30,30]}]
                        // )
                        cThis.mapManager.loadMap(
                            [{"type":"wall","x":[47.5,0,47.5,0,0,47.5,22.5,22.5,0,25,25,47.5,5,7.5,42.5,40,12.5,15,35,32.5,27.5,25,20,22.5,7.5,7.5,12.5,10,12.5,10,12.5,10,7.5,40,40,40,37.5,37.5,35,35,35,37.5,27.5,25,20,22.5,15,12.5,7.5,10,10,37.5,42.5,2.5,5,32.5,35,37.5,40,45,0,2.5,0,47.5,45,47.5,0,2.5,5,5,42.5,42.5,45,47.5],"y":[47.5,0,0,47.5,25,25,47.5,0,22.5,47.5,0,22.5,45,45,45,45,42.5,42.5,42.5,42.5,40,40,40,40,10,12.5,12.5,10,10,12.5,15,15,15,15,12.5,10,10,15,15,12.5,10,12.5,15,15,15,15,37.5,35,30,30,32.5,30,27.5,27.5,27.5,37.5,35,32.5,30,27.5,35,37.5,40,40,37.5,35,5,5,2.5,0,0,2.5,5,5]}]
                        )
                    }
                }
            }
            this.socket.addEventListener("message", verifyID)
        }

        this.me = {
            id:id,
            data:{
                pos:{x:x,y:y},
                hp:5,
                speed: 0.05,
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
        if (!ghost) {
            this.camera = new Camera({x:0,y:0})
            this.camera.follow(this.sprite)
            
            this.dashCD = 0
            this.defDashCD = 600
            this.lastDown = -10000
            this.directions = []
            this.clickin = false
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
                cThis.clickin = true
                console.log(cThis.directions, this.me.data.pos)
            })
            document.addEventListener("keyup", (key) => {
                cThis.directions.splice(cThis.directions.findIndex((arg)=>{if (arg==key.key) {return true}}),1)
                cThis.clickin = false
                console.log(cThis.directions)
            })
            document.addEventListener("click", (pos) => {
                console.log(pos)
            })
        }
    }
    /**
     * Function calling player to move themself
     * @param {*} DeltaTime
     */
    checkMove(params) {
        // |100-1| - 100-1 = 0
        // 99 - 99 = 0
        // |-100-1| - -100-1
        // 101 + 99 = 200
        // |200-1| - 200-1
        // 199 - 199 = 0
        if (this.dashCD) {
            console.log(this.dashCD)
            this.dashCD -= 1*params.DeltaTime;
            if(this.dashCD<0) {
                this.dashCD = 0;
            }

        } 
        for (let i in this.directions) {
            switch (this.directions[i]) {
                case 'w':
                    this.move(0,-this.me.data.speed*params.DeltaTime)
                    break;
                case 's':
                    this.move(0,this.me.data.speed*params.DeltaTime)
                    break;
                case 'd':
                    this.move(this.me.data.speed*params.DeltaTime, 0)
                    break;
                case 'a':
                    this.move(-this.me.data.speed*params.DeltaTime, 0)  
                    break; 
                case 'dw': 
                    if (!this.dashCD) {
                        for (let i = -2.2; i<2.5; i+=0.1) {
                            let meth = (-1*(-1*(1/2*i)+0.5)**2+3)**(-i+(3**(1/2)/10))-0.12
                            this.move(0,-this.me.data.speed*meth*params.DeltaTime/5)
                            this.dashCD = this.defDashCD;

                        }
                        this.directions.splice(this.directions.findIndex((arg)=>{if (arg=='dw') {return true}}),1)
                    }
                    break;
                case 'ds':
                    if (!this.dashCD) {
                        for (let i = -2.2; i<2.5; i+=0.1) {
                            let meth = (-1*(-1*(1/2*i)+0.5)**2+3)**(-i+(3**(1/2)/10))-0.12
                            this.move(0,this.me.data.speed*meth*params.DeltaTime/5)
                            this.dashCD = this.defDashCD;
                        }
                        this.directions.splice(this.directions.findIndex((arg)=>{if (arg=='ds') {return true}}),1)
                    }
                    break;
                case 'dd':
                    if (!this.dashCD) {
                        for (let i = -2.2; i<2.5; i+=0.1) {
                            let meth = (-1*(-1*(1/2*i)+0.5)**2+3)**(-i+(3**(1/2)/10))-0.12
                            this.move(this.me.data.speed*meth*params.DeltaTime/5,0)
                            this.dashCD = this.defDashCD;
                        }
                        this.directions.splice(this.directions.findIndex((arg)=>{if (arg=='dd') {return true}}),1)
                    }
                    break;
                case 'da':
                    if (!this.dashCD) {
                        for (let i = -2.2; i<2.5; i+=0.1) {
                            let meth = (-1*(-1*(1/2*i)+0.5)**2+3)**(-i+(3**(1/2)/10))-0.12
                            this.move(-this.me.data.speed*meth*params.DeltaTime/10,0)
                            this.dashCD = this.defDashCD;
                        }
                        this.directions.splice(this.directions.findIndex((arg)=>{if (arg=='da') {return true}}),1)
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
        this.socket.send(JSON.stringify({
            type: 'move',
            params: {
                pos: {x: this.me.data.pos.x, y: this.me.data.pos.y}
            }
        }))
        console.log(this.camera.camera.x)
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