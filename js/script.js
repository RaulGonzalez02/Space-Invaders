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
let contEnemy = 0;
//CLASS PLAYER
class Player {
    constructor() {
        this.x = 5;
        this.y = 5;
        this.ancho = 100
        this.alto = 100
        this.misiles = []
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
    disparar() {
        let misil = new Missile(this.x * this.ancho + 45, this.y * this.alto)
        this.misiles.push(misil)
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
    //FUNTIONS CLASS
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

    destroy(missiles) {
        for (let i = 0; i < missiles.length; i++) {
            let missile = missiles[i];
            if (this.x * this.ancho < missile.x + missile.ancho &&
                this.x * this.ancho + this.ancho > missile.x &&
                this.y * this.alto < missile.y + missile.alto &&
                this.y * this.alto + this.alto > missile.y) {
                missiles.splice(i, 1);
                enemies.splice(enemies.indexOf(this), 1);
            }
        }
    }
}

//CLASS MISSILE
class Missile {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.ancho = 5
        this.alto = 15
        this.velocidad = 5
    }
    //FUNTIONS CLASS
    dibuja() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.ancho, this.alto);
    }

    move() {
        this.y -= this.velocidad;
    }
}
//FUNTIONS
const inicializa = () => {
    canvas = document.getElementById("canvas")
    ctx = canvas.getContext("2d")
    player = new Player()
    playerIMG = document.createElement("IMG");
    playerIMG.src = "../assets/images/nave5.png"
    /*    enemiesIMG = document.createElement("IMG");
       enemiesIMG.src = "../assets/images/nave4.png"
       enemies.push(new Enemy(5, 1, enemiesIMG))
       enemiesIMG.src = "../assets/images/nave4.png"
       enemies.push(new Enemy(6, 1, enemiesIMG)) */
    crearEnemigos()
    inicioJuego = setInterval(principal, 1000 / 30)
}
//Funcion principal del juego
const principal = () => {
    canvas.width = wCanvas
    canvas.height = hCanvas
    player.dibuja()
    contEnemy = enemies.length;
    score.textContent = contEnemy + " enemigos"
    player.misiles.forEach((missile) => {
        missile.dibuja();
        missile.move();
    });
    enemies.map((enemy) => {
        enemy.dibuja()
        enemy.move()
        enemy.destroy(player.misiles)
    })

    if (contEnemy == 0) {
        score.textContent = "HAS ELIMINADO A TODOS LOS ENEMIGOS!!!"
        finJuego()
    }
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
    btn_reinicio.classList.add("mostrar")
    //console.log(enemies);
}
//Funcion para recargar el juego
const reincioJuego = () => {
    window.location.reload()
}
//Verificar colision con los enemigos
const colision = () => {
    for (const enemy of enemies) {
        if ((player.y <= enemy.y + 0.7 && player.y >= enemy.y - 0.5) && (player.x <= enemy.x + 0.7 && player.x >= enemy.x - 0.5)) {
            //console.log("colision");
            clearInterval(inicioJuego)
            score.textContent = "HAS COLISIONADO !! INVASION EN PROCESO..."
            finJuego()
        }
    }
}

//Funcion para que la nave lanze misiles, cuando se pulsa la tecla "z"
const disparaMisil = (event) => {
    let key = event.key
    if (key == "z" || key == "Z") {
        player.disparar();
    }
}
//LISTENER
document.addEventListener("DOMContentLoaded", inicializa)
document.addEventListener("keydown", moverPlayer)
document.addEventListener("keydown", disparaMisil)
btn_reinicio.addEventListener("click", reincioJuego)