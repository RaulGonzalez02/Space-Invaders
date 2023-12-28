let canvas;
let ctx;
let container = document.getElementById("container")
let score = document.getElementById("score")
let wCanvas = 1080;
let hCanvas = 600;
let fps = 60;
let player;
let playerIMG;

//CLASS
class Player {
    constructor() {
        this.x = 5;
        this.y = 5;
        this.ancho = 100
        this.alto = 100
    }

    //FUNTIONS CLASS
    dibuja() {
        ctx.drawImage(
            playerIMG,
            this.x * this.ancho, this.y * this.alto, this.ancho, this.alto
        )
    }

    moverUp() {
        if (this.y - 0.2 >= 0) {
            this.y -= 0.2;
            //console.log(this.y);
        }
    }
    moverLeft() {
        if (this.x - 0.2 >= 0) {
            this.x -= 0.2
            //console.log(this.x);
        }
    }
    moverDow() {
        if (this.y + 0.2 < 5.2) {
            this.y += 0.2
        }
    }
    moverRig() {
        if (this.x + 0.2 < 9.4) {
            this.x += 0.2
            //console.log(this.x);
        }
    }
}
//FUNTIONS
const inicializa = () => {
    canvas = document.getElementById("canvas")
    ctx = canvas.getContext("2d")
    player = new Player()
    playerIMG = document.createElement("IMG");
    playerIMG.src = "../assets/images/nave5.png"
    setInterval(principal, 1000 / 60)
}

const principal = () => {
    canvas.width = wCanvas
    canvas.height = hCanvas
    player.dibuja()

}

const moverPlayer = (event) => {
    let key = event.key
    switch (key) {
        case "ArrowUp":
            // console.log(key);
            player.moverUp()

            break;
        case "ArrowDown":
            //console.log(key);
            player.moverDow()

            break;
        case "ArrowLeft":
            //console.log(key);
            player.moverLeft()

            break;
        case "ArrowRight":
            player.moverRig()
            break;
    }
}

//LISTENER
document.addEventListener("DOMContentLoaded", inicializa)
document.addEventListener("keydown", moverPlayer)