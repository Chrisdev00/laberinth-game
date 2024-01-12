var canvas;
var ctx;
var FPS = 50;

var anchoF = 40;
var altoF = 40;

var muro = '#044f14';
var puerta = '#3a1700';
var tierra = '#c6892f';
var llave = '#c6bc00';

var enemigo = [];

var protagonista;
var tileMap;

var escenario = [

    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,2,2,0,0,0,2,2,2,2,0,0,2,2,0,2,2,0,0],
    [0,0,2,2,2,2,2,0,0,2,0,0,2,0,0,2,2,2,0],
    [0,0,2,0,0,0,2,2,0,2,2,2,2,0,0,0,2,0,0],
    [0,0,2,2,2,0,0,2,0,0,0,2,0,0,0,2,0,2,0],
    [0,2,2,0,0,0,0,2,0,0,0,2,0,0,0,2,2,2,0],
    [0,0,2,0,0,0,2,2,2,0,0,2,2,2,0,0,2,2,0],
    [0,2,2,2,0,0,2,0,0,0,1,0,0,2,0,2,0,0,0],
    [0,2,2,3,0,0,2,0,0,2,2,2,2,2,0,0,2,2,0],
    [0,2,2,2,2,2,2,0,0,0,2,2,0,2,0,0,0,2,0],
    [0,0,0,0,2,2,2,0,0,2,2,0,0,0,2,2,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

]

function dibujaEscenario () {

    var color;

    for (y = 0; y < 12; y++) {
        for (x = 0; x < 19; x++) {
            
            var tile = escenario[y][x];
            ctx.drawImage(tileMap, tile*32,0,32,32, anchoF*x, altoF*y, anchoF, altoF)
            
            
            // if (escenario[y][x] == 0)
            //     color = muro;
            // if (escenario[y][x] == 1)
            //     color = puerta;
            // if (escenario[y][x] == 2)
            //     color = tierra;
            // if (escenario[y][x] == 3)
            //     color = llave;

            // ctx.fillStyle = color
            // ctx.fillRect(x*anchoF, y*altoF ,anchoF, altoF)
        }
    }
}

// antorchas

var antorcha = function (x, y) {

    this.x = x;
    this.y = y;

    this.retraso = 10;
    this.contador = 0;
    this.fotograma = 0;  // 0-3

    this.cambiarFotograma = function () {

        if (this.fotograma < 3) {
            
            this.fotograma ++;
        }
        else{
            this.fotograma = 0;
        }
    }

    this.dibuja = function () {

        if (this.contador < this.retraso){
            this.contador ++;            
        }
        else{
            this.contador = 0;
            this.cambiarFotograma();
        }

        ctx.drawImage(tileMap, this.fotograma*32,64,32,32, anchoF*x, altoF*y, anchoF, altoF);
    }

}

// clase enemiga

var malo = function (x, y) {
    
    this.x = x;
    this.y = y;
    this.direccion = Math.floor(Math.random() *4);

    this.retraso = 50;
    this.fotograma = 0;

    this.dibuja = function () {

        ctx.drawImage(tileMap,0,32,32,32, this.x*anchoF, this.y*altoF, anchoF, altoF);

    }

    this.compruebaColision = function (x, y) {

        var colisiona = false;

        if (escenario[y][x] == 0) {
            
            colisiona = true;
        }
        return colisiona;
    }

    this.mueve = function () {

        protagonista.colisionEnemigo(this.x, this.y);

        if (this.contador < this.retraso) {
            this.contador += 3;
        } 
        else {

            this.contador = 0;        

            // arriba 
            if (this.direccion == 0) {
                if (this.compruebaColision(this.x, this.y - 1) == false) {
                    
                    this.y --;

                } else {

                    this.direccion = Math.floor(Math.random() * 4);
                }
            }

            // abajo
            if (this.direccion == 1) {
                if (this.compruebaColision(this.x, this.y + 1) == false) {
                    
                    this.y ++;

                } else {

                    this.direccion = Math.floor(Math.random() * 4);
                }
            }

            // izquierda
            if (this.direccion == 2) {
                if (this.compruebaColision(this.x - 1, this.y) == false) {
                    
                    this.x --;

                } else {

                    this.direccion = Math.floor(Math.random() * 4);
                }
            }

            // derecha
            if (this.direccion == 3) {
                if (this.compruebaColision(this.x + 1, this.y) == false) {
                    
                    this.x ++;

                } else {

                    this.direccion = Math.floor(Math.random() * 4);
                }
            }
        }

    }
}


var jugador = function () {
    this.x = 1;
    this.y = 1;
    this.color = '#820c01';
    this.llave = false;

    this.dibuja = function () {

        ctx.drawImage(tileMap,32,32,32,32, this.x*anchoF, this.y*altoF, anchoF, altoF);
        
    }

    this.colisionEnemigo = function (x, y) {

        if (this.x == x && this.y == y) {
            
            this.muerte();
        }

    }

    this.margenes = function (x, y) {

        var colision = false;

        if (escenario[y][x] == 0) {
            colision = true;
        }

        return(colision);
    }


    this.arriba = function () {
        if (this.margenes(this.x, this.y-1) == false)
            this.y --;
            this.logicaObjetos();
    }
    this.abajo = function () {
        if (this.margenes(this.x, this.y+1) == false)
            this.y ++;
            this.logicaObjetos();
    }
    this.izquierda = function () {
        if (this.margenes(this.x-1, this.y) == false)
            this.x --;
            this.logicaObjetos();
    }
    this.derecha = function () {
        if (this.margenes(this.x+1, this.y) == false)
            this.x ++;
            this.logicaObjetos();
    }

    this.victoria = function () {
        console.log('Has ganado!!!!');

        this.x = 1;
        this.y = 1;

        this.llave = false;
        escenario[8][3] = 3;

    }

    this.muerte = function () {

        console.log('Has perdido!!!!');

        this.x = 1;
        this.y = 1;

        this.llave = false;
        escenario[8][3] = 3;
    }


    this.logicaObjetos = function () {

        var objeto = escenario[this.y][this.x];

        // Obtiene llave
        if (objeto == 3) {
            this.llave = true;
            escenario[this.y][this.x] = 2;
            console.log('Has obtenido la llave');
        }

        // abrimos la puerta

        if (objeto == 1) {

            if (this.llave == true) {
                this.victoria();
            }
            else {
                console.log('No tienes la llave, no puedes ingresar')
            }
        }

    }
}






function inicializa () {
    
    canvas = document.getElementById('canvas');
    ctx= canvas.getContext('2d');

    tileMap = new Image();
    tileMap.src = 'img/tilemap.png'

    // Crear jugador
    
    protagonista = new jugador();

    // creamos la antorcha

    imagenAntorcha = new antorcha(0,0);

    // creamos enemigos

    enemigo.push(new malo(3,3));
    enemigo.push(new malo(5,7));
    enemigo.push(new malo(7,4));

    // Lectura del teclado
    document.addEventListener('keydown', function (tecla) {
        
        //arriba
        if (tecla.keyCode == 38) {

            protagonista.arriba();  
        }    
        // abajo
        if (tecla.keyCode == 40) {
    
            protagonista.abajo();    
        }    
        // izquierda
        if (tecla.keyCode == 37) {
    
            protagonista.izquierda();    
        }    
        // derecha
        if (tecla.keyCode == 39) {
    
            protagonista.derecha();    
        }

    })


    setInterval(function () {

        principal();

    }, 1000 / FPS);
}

function borrarCanvas () {

    canvas.width = 750;
    canvas.height = 500;
}

function principal () {

    borrarCanvas();
    dibujaEscenario();
    imagenAntorcha.dibuja();
    protagonista.dibuja();

    for (c = 0; c < enemigo.length; c++) {

        enemigo[c].mueve();
        enemigo[c].dibuja();
    }

}