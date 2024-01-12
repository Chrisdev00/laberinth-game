var canvas;
var ctx;
var FPS = 50;
var imgMega;


function inicializa () {
    canvas = document.getElementById('canvas');
    ctx= canvas.getContext('2d');

    // Cargamos imagen megaman
    imgMega = new Image();
    imgMega.src = 'img/mega.jpg';
    imgMega.width = 100;
    imgMega.height = 100;

    setInterval(function () {

        principal();

    }, 1000) / FPS;

}

var protagonista = function (x, y) {

    this.x = x;
    this.y = y;
    this.velocidad = 3;

    this.dibuja = function () {
        
        ctx.drawImage(imgMega, this.x, this.y);
    }

    this.arriba = function () {

        this.y -= this.velocidad;
        
    }
    this.abajo = function () {

        this.y += this.velocidad;

    }
    this.izquierda = function () {

        this.x -= this.velocidad;

    }
    this.derecha = function () {

        this.x += this.velocidad;

    }

}


var personaje = function (x, y) {

    this.x = x;
    this.y = y;
    this.derecha = true;

    this.dibuja = function () {
        
        ctx.fillStyle = '#fff000';
        ctx.fillRect(this.x , this.y ,50 , 50);

    }

    this.mueve = function (velocidad) {

        if (this.derecha == true){
            if (this.x < 400)
                this.x += velocidad;
            else{
                this.derecha = false;
            }
        }
        else{
            if (this.x > 50)
                this.x -= velocidad;
            else{
                this.derecha = true;
            }
        }

    }
}


var per1 = new personaje(10, 50);
var per2 = new personaje(10, 120);
var per3 = new personaje(10, 230);

var prota = new protagonista(200, 200);

document.addEventListener('keydown', function (tecla) {

    // arriba
    if (tecla.keyCode == 38) {

        prota.arriba();

    }

    // abajo
    if (tecla.keyCode == 40) {

        prota.abajo();

    }

    // izquierda
    if (tecla.keyCode == 37) {

        prota.izquierda();

    }

    // derecha
    if (tecla.keyCode == 39) {

        prota.derecha();

    }
})




function borraCanvas () {

    canvas.witdh = 500;
    canvas.height = 400;
}

function principal () {

    borraCanvas()
    per1.dibuja();
    per2.dibuja();
    per3.dibuja();

    per1.mueve(1);
    per2.mueve(3);
    per3.mueve(70);

    prota.dibuja();
    

    console.log('funcion')
}