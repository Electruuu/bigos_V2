export default class db {
    /**
     * 
     * @param {*} plys - Optional Player Data. Recomended not to Change It. 
     */
    constructor(plys=[]) {
        this.players = plys;
        this.defplayer = {
            id:-1,
            data:[
                [-1, -1],
                -1,
                '...'
            ]
        }
        /*[
            [
                'nazwa/id',
                [
                    ['x','y'],
                    'hp',
                    'itd'
                ]
            ]
        ]*/
    }
    /**
     * 
     * @param {int} id - Player's Id to Be Set.
     * @returns - Exit Value.
     */
    addPlayer(id) {
        if (id+1) {
            for (let i in this.players) {
                if(this.players[i]['id']==id) {
                    console.log("taki gracz istnieje")
                    return -1;
                }
            }
            this.players[this.players.length] = {id:id,data:[]};
        } else {
            let temp = [];
            for (let i in this.players) {
                temp[temp.length] = this.players[i]['id'];
            }
            let s = 0;
            for (let s = 0;;s++) {
                if (!temp.includes(s)) {
                    this.players[this.players.length] = {id:s,data:[]};
                    break;
                }
            }
        }
        return 0;
    }
    /**
     * 
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
}