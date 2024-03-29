export default class db {
    /**
     * Creates Class to Store Data.
     * @param {*} plys - Optional Player Data. Recomended not to Change It. 
     * @param {*} resv - Optional Reservations Data. Recomended not to Change It.
     * @param {*} prjc - Optional Projectile Data. Recomended not to Change It.
     * @param {*} lobs - Optional Lobby Data. Recomended not to Change It.
     */
    constructor(params) {
        /* Player Data Structure:
        [
            {
                id:'id', // duh 
                data:{
                    pos:{x:'x',y:'y'}, // Players Position
                    hp:'hp', // Amout of Player's Hp
                    spd: 'spd', // The Speed That Player Posses 
                    add:'itd' // Addtionals (Basicly "To Be Continued")
                }
            },
            {...} // More Players
        ]*/
        /* Lobby Data Structure:
        [
            {
                id:'name', // Name of the lobby
                data:{
                    players: [id, id, id], // Id's of the players
                    map: 'mapname', // Name of the map (mostly for information before joining)
                    size: 4 // Amount of players
                }
            }
        ]
        */
        /* Projectile Data Structure
        [
            {
                type: 'type' // Later Feature Potential. Exrpres which Type of Bullet It is. 
                data:{
                    ex: {a:'a',b:'b'}, // Linear Expression
                    x0: 'x0' // Starting Point of Function
                    x: '>>' // Current Position of Projectile
                }
            }
        ]*/
        this.players = params.plys || [];
        this.defplayer = {
            id:-1,
            data:{
                pos:{x:-1, y:-1},
                hp:-1,
                spd: 0,
                agl: 0,
                add:'...'
            }
        }
        this.reservations = params.resv || [];
        this.projectiles = params.prjc || [];
        this.lobbies = params.lobs || [];

        this.createLobby({
           name: 'default', 
        })
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
    addPlayer(params) {
        if (this.reservations.includes(params.id)) {
            this.players[this.players.length] = {
                id:params.id,
                data:{
                    pos:{x:params.x || 0, y:params.y || 0},
                    Hp:5,
                    spd: 1,
                    agl: 0, 
                    add: '...'
                }
            };
            this.reservations.splice(this.reservations.indexOf(params.id),1)
            return 1;
        }
        if (params.id!=-1) {
            for (let i in this.players) {
                if(this.players[i].id==params.id) {
                    console.log("taki gracz istnieje")
                    return -1;
                }
            }
            this.players[this.players.length] = {
                id:params.id,
                data:{
                    pos:{x:params.x || 0, y:params.y || 0},
                    Hp:5,
                    spd: 1,
                    agl:0,
                    add: '...'
                }
            };
        } else {
            this.players[this.players.length] = {
                id:this.nextID(),
                data:{
                    pos:{x:params.x || 0, y:params.y || 0},
                    Hp: 5,
                    spd: 1,
                    agl:0,
                    add: '...'
                }
            };
        }
        return 0;
    }
    addProjectile() {

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
    /**
     * Creates new lobby.
     * Exit Codes:
     * 0 - Lobby Creation Successfull.
     * -1 - Lobby Creation Unsuccessfull.
     * @param {*} name - Name of the lobby. 
     * @param {*} map - Name of the map. If left blank, map name = default.
     * @param {*} size - Size of the lobby (max players).
     * @returns Exit Code.
     */
    createLobby(params) {
        for (let i in this.lobbies) {
            if (this.lobbies[i].name == params.name) {
                return -1;
            }
        }
        this.lobbies[this.lobbies.length] = {
            id: params.name,
            data: {
                players: [],
                map: params.map || 'default',
                size: params.size || 4
            }
        }
        return 0;
    }
    /**
     * Adds Player to lobby
     * Exit codes:
     * 0 - Player Succsesfully Joined Lobby
     * -1 - Player Didn't Join Lobby 
     * @param {*} LobbyID - ID of Lobby that Player want to Join
     * @param {*} PlayerId - ID of Player that wants to Join Lobby
     * @returns Exit Codes
     */
    joinLobby(params) {
        let temp
        for (let i=0;i<this.lobbies[this.lobbies.findIndex((arg)=>{if(arg.id==params.LobbyID){return true}})];)
        if(temp) {

        }
    }
}