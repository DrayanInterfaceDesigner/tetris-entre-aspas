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