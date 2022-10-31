export default class db {
    /**
     * Creates Class to Store Data.
     * @param {*} plys - Optional Player Data. Recomended not to Change It. 
     * @param {*} resv - Optional Reservations Data. Recomended not to Change It.
     */
    constructor(plys=[],resv=[]) {
        this.players = plys;
        this.defplayer = {
            id:-1,
            data:{
                pos:{x:-1, y:-1},
                hp:-1,
                spd: 0,
                add:'...'
            }
        }
        this.reservations = resv;
        /* Player Data Structure:
        [
            {
                id:'nazwa/id',
                data:{
                    {x:'x',y:'y'},
                    hp:'hp',
                    add:'itd'
                }
            },
            {...}
        ]*/
    }
    /**
     * Add Player Data with Given ID
     * Exit Codes:
     * -1 - Complted Adding New Player Unsuccsessfully Due to Already Existing Player with given ID.
     * 0 - Completed Adding New Player With Given ID.
     * 1 - Added New Player With ID from Reservations. 
     * @param {int} id - Player's ID to Be Set.
     * @param {int} x - Player's ID to Be Set.
     * @param {int} y - Player's ID to Be Set.
     * @returns Exit Code.
     */
    addPlayer(id, x, y) {
        if (this.reservations.includes(id)) {
            this.players[this.players.length] = {
                id:id,
                data:{
                    pos:{x:x,y:y},
                    Hp:5,
                    spd: 1,
                    add: '...'
                }
            };
            this.reservations.splice(this.reservations.indexOf(id),1)
            return 1;
        }
        if (id!=-1) {
            for (let i in this.players) {
                if(this.players[i].id==id) {
                    console.log("taki gracz istnieje")
                    return -1;
                }
            }
            this.players[this.players.length] = {
                id:id,
                data:{
                    pos:{x:x,y:y},
                    Hp:5,
                    spd: 1,
                    add: '...'
                }
            };
        } else {
            this.players[this.players.length] = {
                id:this.nextID(),
                data:{
                    pos:{x:x,y:y},
                    Hp: 5,
                    spd: 1,
                    add: '...'
                }
            };
        }
        return 0;
    }
    /**
     * Returns Next avalible ID. 
     */
    nextID() {
        let temp = [];
        for (let i in this.players) {
            temp[temp.length] = this.players[i].id;
        }
        for (let s = 0;;s++) {
            if (!temp.includes(s) && !this.reservations.includes(s)) {   
                this.reserveID(s) 
                return s;
            }
        }
    }
    /**
     * Returns Player with Given ID.
     * @param {int} id - Id of Player That is Searched.
     * @returns Player Object (if not Found Returns Default Player).
     */
    getPlayer(id) {
        for (let i in this.players) {
            if (this.players[i]['id']==id) {
                return this.players[i];
            }
        }

        return this.defplayer;
    }
    /**
     * Adds ID to Pool of Reserved IDs for later creation.
     * @param {*} id - ID to Reserve. 
     * @returns Exit Code.
     */
    reserveID(id) {
        if (this.getPlayer(id).id==-1 && !this.reservations.includes(id)) {
            this.reservations[this.reservations.length] = id
            return 0;
        }
        return -1;
    }
}