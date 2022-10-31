export default function incoming (msg, ws) {
    msg = JSON.parse(msg.toString())
    console.log(msg)
    switch(msg.type) {
        case 'test':
            console.log(global.data.players)
            break
        case 'pass':
            ws.send(JSON.stringify({type:'rpass', params:msg.params}));
            break
        case 'idver': 
            if (global.data.getPlayer(msg.params.id).id==-1 && msg.params.id != -1) {
                ws.send(JSON.stringify({
                    type:'ridver',
                    params:{
                        id:msg.params.id,
                        tid:msg.params.tid
                    }
                }));
            } else {
                let nextID = global.data.nextID();
                let i =0
                ws.send(JSON.stringify({
                    type:'ridver',
                    params:{
                        id:nextID,
                        tid:msg.params.tid
                    }
                }));
            }
            break
        case 'adply':
            if (global.data.addPlayer(msg.params.id, msg.params.pos.x, msg.params.pos.y) != -1) {
                ws.send(JSON.stringify({
                    type:'radply',
                    params:{
                        id:msg.params.id,
                        pos:{x:msg.params.pos.x,y:msg.params.pos.y}
                    }
                }))
                console.log('uwu')
            }
            break
        case 'getply':
            ws.send(JSON.stringify({
                type:'rgetply',
                params:global.data.players
            }))        
    }
}