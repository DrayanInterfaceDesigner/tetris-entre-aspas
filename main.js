const canvas = document.querySelector("#game")
const ctx = canvas.getContext('2d')

class Controller {
    constructor() {
        this.left = false
        this.right = false
        this.space = false
        this.x = false
    }

    update() {
        this.input()
    }

    input() {
        
        document.onkeydown = e => {
            switch(e.key) {
                case "ArrowLeft":
                    this.left = true
                    break;
                case "ArrowRight":
                    this.right = true
                    break;
                case " ":
                    this.space = true
                    break;
                case "x":
                    this.x = true
            }
        }

        document.onkeyup = e => {
            switch(e.key) {
                case "ArrowLeft":
                    this.left = false
                    break;
                case "ArrowRight":
                    this.right = false
                case " ":
                    this.space = false
                    break;
                case "x":
                    this.x = false
            }
        }
    }
}

class Timer {

    constructor(timeStep, intervalFactor = 1) {
        this.date = new Date()
        this.time = this.date.getSeconds()
        this.timeStep = timeStep
        this.intervalFactor = intervalFactor
        this.ellapsed = 0
        this.hasStarted = false
        this.hasEnded
        this.timerFunction
    }

    init() {
        this.update()
        this.start()
    }

    start() {

        this.end()

        if(!this.hasStarted) {
            this.hasStarted = true
            this.count()
        }
    }

    end() {
        if(this.hasEnded) {
            this.reset()
            // this.hasEnded = false
        }
    }

    count() {
        this.timerFunction = setInterval(() => { this.ellapsed+= 1 }, 
        1000 * this.intervalFactor)
    }

    reset() {
        if(this.ellapsed >= this.timeStep) {
            this.hasStarted = false
            this.date = new Date()
            this.time = this.date.getSeconds()
            this.ellapsed = 0
            clearInterval(this.timerFunction)
        }
    }

    update() {
        this.hasEnded = this.ellapsed >= this.timeStep
    }
}

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
        if(this.isOnFloor()) this.canControl = false
        this.controls.update()

        if(!this.canControl) return
        
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

const timer = new Timer(1, .5)

let tile = new Tile({
    x: 100,
    y: 100
})

tile.pickType()

function main() {
    canvas.width = 300
    canvas.height = window.innerHeight
    tile.update()
    tile.draw(ctx)

    timer.init()

    console.log(timer.ellapsed, timer.hasEnded)
    if(timer.hasEnded && !tile.isOnFloor() ){
        console.log("hi")
        tile.y += tile.stepDistance  * 4
    }
    
    requestAnimationFrame(main)
}

main()