
//var keyLastPressed = null
 


/*window.setInterval(() => {
    console.log(giveXY())
}, 1000)*/

export default class Inputs {
    /**
     * WRITE THIS DOCUMENTATION ASAP.
     * @param {Document} doc - Document to Attach Listeners.
     */
    constructor(params) {
        this.keyPressed = []
        this.mouseX = null
        this.mouseY = null
        this.clicked = false
        let doclist = params.doc
        document.addEventListener("keydown", this.getKey)
        document.addEventListener("keyup", this.nullKey)
        document.addEventListener("mousedown", this.click)
        document.addEventListener("mousemove", this.getXY)
        document.addEventListener("mouseup", this.nullXY) 
    }
    getKey(event) {
        if (this.keyPressed==undefined) {
            this.keyPressed = []
        }
        if(!this.keyPressed.includes(event.key)){
            this.keyPressed.push(event.key)
        }
        this.keyPressed = new Set(this.keyPressed)
        this.keyPressed = Array.from(this.keyPressed);
    }
    nullKey(event) {
        this.keyPressed = this.keyPressed.filter(item => item !== event.key)
    }
    giveKey() {
        return this.translateKey(this.keyPressed)
    }
    getXY(event) {
        this.mouseX = event.x
        this.mouseY = event.y
    }
    nullXY() {
        this.clicked = false
    }
    giveXY() {
        return (this.clicked) ? [this.mouseX, this.mouseY] : [null,null]
    }
    click(event) {
        this.mouseX = event.x
        this.mouseY = event.y
        this.clicked = true
    }
    translateKey(key) {
        var res = {a:0, w:0, d:0, s:0}
        for(var x in key) {
            switch (key[x]) {
                case "a":
                    res.a = 1
                    break
                case "w":
                    res.w = 1
                    break
                case "s":
                    res.s = 1
                    break
                case "d":
                    res.d = 1
                    break
            }
        }
        return res;
    }
}