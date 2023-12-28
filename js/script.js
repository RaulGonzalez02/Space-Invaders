//Variables globales
let canvas;
let ctx;
let container = document.getElementById("container")
let score = document.getElementById("score")
let btn_reinicio = document.getElementById("btn_reinicio")
let wCanvas = 1100;
let hCanvas = 600;
let fps = 60;
let player;
let playerIMG;
let enemies = []
let enemiesIMG;
let inicioJuego
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
        if (this.x + 0.2 < 10) {
            this.x += 0.2
            //console.log(this.x);
        }
    }
}
//CLASS ENEMIES
class Enemy {
    constructor(x, y, image) {
        this.x = x
        this.y = y
        this.image = image
        this.ancho = 100
        this.alto = 100
        this.velocidad = 0.005
    }
    dibuja() {
        ctx.drawImage(
            this.image,
            this.x * this.ancho, this.y * this.alto, this.ancho, this.alto
        )
    }
    move() {
        if (this.y - this.velocidad < 6 && !this.llegarFinal(this.y)) {
            this.y += this.velocidad
        } else {
            clearInterval(inicioJuego)
            score.textContent = "GAME OVER !! HAN INVADIDO EL PLANETA"
            finJuego()
        }
    }

    llegarFinal() {
        if (this.y >= 6) {
            //console.log("partida finalizada");
            return true;
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
    crearEnemigos()
/*     enemiesIMG = document.createElement("IMG");
    enemiesIMG.src = "../assets/images/nave4.png"
    enemies.push(new Enemy(5, 3, enemiesIMG)) */
    inicioJuego = setInterval(principal, 1000 / 30)
}
//Funcion principal del juego
const principal = () => {
    canvas.width = wCanvas
    canvas.height = hCanvas
    player.dibuja()
    enemies.map((enemy) => {
        enemy.dibuja()
        enemy.move()
    })
    colision()
}
//Funcion para que se mueva el jugador
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

//Funcion para crear todos los enemigos
const crearEnemigos = () => {
    for (let i = 0; i <= 10; i++) {
        for (let j = 0; j < 4; j++) {
            if (j == 0) {
                enemiesIMG = document.createElement("IMG");
                enemiesIMG.src = "../assets/images/nave4.png"
                enemies.push(new Enemy(i, j, enemiesIMG))
            }
            if (j == 1) {
                enemiesIMG = document.createElement("IMG");
                enemiesIMG.src = "../assets/images/nave3.png"
                enemies.push(new Enemy(i, j, enemiesIMG))
            }
            if (j == 2) {
                enemiesIMG = document.createElement("IMG");
                enemiesIMG.src = "../assets/images/nave6.png"
                enemies.push(new Enemy(i, j, enemiesIMG))
            }
        }
    }
}

//Funcion para que aparezca el boton de reiniciar juego
const finJuego = () => {
    btn_reinicio.style.display = "block"
}
//Funcion para recargar el juego
const reincioJuego = () => {
    window.location.reload()
}
//
const colision = () => {
    for (let i = 0; i < enemies.length; i++) {
        let enemy = enemies[i]
        if (player.y + player.alto <= enemy.y + enemy.alto + 0.5 || player.x + player.ancho == enemy.x + enemy.ancho * 0.5) {
            //console.log("colision");
            clearInterval(inicioJuego)
            score.textContent="HAS COLISIONADO !! INVASION EN PROCESO..."
            finJuego()
        }

    }
}
//LISTENER
document.addEventListener("DOMContentLoaded", inicializa)
document.addEventListener("keydown", moverPlayer)
btn_reinicio.addEventListener("click", reincioJuego)