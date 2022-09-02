class Tile {

    constructor({x, y, w, h, colors}){
        this.x = x
        this.y = y
        this.w = w ? w : 25
        this.h = h ? h : 25
        this.defaultPalette = [
            "green",
            "yellow",
            "red",
            "blue",
            "orange",
            "pink"
        ]
        this.palette = colors ? colors : this.defaultPalette
        this.color = ""
        this.type
        this.stepDistance = 5
        this.canControl = true
        this.falling = false
        this.floorLimit = 500
        this.controls = new Controller()

       //streched matrix for better visualisation
        this.matrix = [[0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0]]
        this.types = [
            [[0, 1, 1],
            [1, 1, 0]],
            
            [[1, 1, 0],
            [0, 1, 1]],

            [[0, 1, 0],
            [1, 1, 1]],

            [[0, 0, 0],
            [1, 1, 1]],

            [[1, 1, 0],
            [1, 1, 0]],

            [[1, 1, 1],
            [0, 0, 1]],

            [[1, 1, 1],
            [1, 0, 0]],
        ]
        this.generateRandomColor()
        // this.generateRandomMatrix()
    }

    draw(ctx) {
        this.fillMatrix(ctx)
    }

    update() {
        this.move()
    }

    move() {
        this.controls.update()
        if(this.controls.left) this.x -= this.stepDistance
        if(this.controls.right) this.x += this.stepDistance
        if(this.controls.x) this.rotate()
        if(this.controls.space) this.falling = true
        if(this.falling) {
            if(this.isOnFloor()) this.y = this.y
            else this.y += this.stepDistance * 4
        }
    }

    rotate(){
        
    }

    tileDraw(ctx, rowPos, colPos) {
        ctx.fillStyle = this.color
        ctx.strokeStyle = "white"
        ctx.rect(this.x + colPos, this.y + rowPos, this.w, this.h)
        ctx.fill()
        ctx.stroke()
    }

    fillMatrix(ctx) {
        const rowLen = this.type.length - 1

        for(let x = 0; x <= rowLen; x++){
            for(let y = 0; y <= (this.type[x].length - 1); y++) {
                if(this.type[x][y] == 1) {
                    this.tileDraw(ctx, x * this.h, y * this.w)
                } 
            }
        }

    }

    generateRandomMatrix() {
        const rowLen = this.matrix.length - 1

        for(let x = 0; x <= rowLen; x++) {
            for(let y = 0; y <= (this.matrix[x].length - 1); y++) {
                this.matrix[x][y] = Math.round(Math.random())
            }
        }
    }

    pickType() {
        const len = this.types.length
        this.type = this.types[Math.round(Math.random() * (len-1))]
        console.log(this.type)
    }

    generateRandomColor() {
        this.randomNumber = Math.random() * (this.palette.length - 1)
        this.color = this.palette[ Math.floor(this.randomNumber) ]
    }

    isOnFloor() {
        if(this.y >= this.floorLimit) return true
        else return false
    }
    fall() {}
}