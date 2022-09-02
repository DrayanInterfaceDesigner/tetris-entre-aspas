class Timer {

    constructor(interval) {
        this.date = new Date()
        this.time = this.date.getSeconds()
        this.interval = interval <= 0 ? 1 : interval
        this.ellapsed = 0
        this.hasStarted = false
        this.hasEnded = true
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
            this.hasEnded = false
        }
    }

    count() {
        this.timerFunction = setInterval(() => { this.ellapsed+= 1 }, 1000)
    }

    reset() {
        if(this.ellapsed >= this.interval) {
            this.hasStarted = false
            this.date = new Date()
            this.time = this.date.getSeconds()
            this.ellapsed = 0
            clearInterval(this.timerFunction)
        }
    }

    update() {
        this.hasEnded = this.ellapsed >= this.interval
    }
}