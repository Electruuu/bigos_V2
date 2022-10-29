export default class db {
    /**
     * Creates Class to Store Data.
     * @param {*} plys - Optional Player Data. Recomended not to Change It. 
     */
    constructor(plys=[]) {
        this.players = plys;
        this.defplayer = {
            id:-1,
            data:{
                pos:{x:-1, y:-1},
                hp:-1,
                add:'...'
            }
        }
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
     * @param {int} id - Player's Id to Be Set.
     * @returns - Exit Value.
     */
    addPlayer(id) {
        if (id!=-1) {
            for (let i in this.players) {
                if(this.players[i].id==id) {
                    console.log("taki gracz istnieje")
                    return -1;
                }
            }
            this.players[this.players.length] = {id:id,data:{}};
        } else {
            this.players[this.players.length] = {id:this.nextID(),data:{}};
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
        let s = 0;
        for (let s = 0;;s++) {
            if (!temp.includes(s)) {    
                return s;
            }
        }
    }
    /**
     * Returns Player with Given ID.
     * @param {int} id - Id of Player That is Searched.
     * @returns - Player Object (if not Found Returns Default Player).
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
     * Decodes Value into Actions:
     * 1 - Check ID List for id (params Must Include 'id:'). 
     * @param {int} val - Value to Decode.
     * @param {*} params - Additionals Params. (Depends on val).
     */
    decode(val, params={}) {
        switch (val) {
            case 0:
                return params;
            case 1: 
                if (this.getPlayer(params.id).id==-1) {
                    return {val:-1, params:{id:params.id}};
                } else {
                    return {val:-1, params:{id:this.nextID()}};
                }
        }
    }
}