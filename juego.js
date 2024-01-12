// var numero1, numero2, resultado;

// function suma(num1, num2){
//     var valor
//     valor = parseInt(num1) + parseInt(num2);
//     return (valor)
// }

// function action (){
//     numero1 = prompt('Introduce el numero 1')
//     numero2 = prompt('Introduce el numero 2')
//     resultado = suma(numero1, numero2)
//     console.log(resultado)
// }


// Aca Empieza un ejemplo de minijuego

// var turno = 1;
// var vida = 100;

// // Estados del jugador

// var vivo = true;
// var envenenado = false;
// var quemado = false;

// // Jugadas CPU

// var atacar = 0;
// var quemar = 1;
// var envenenar = 2;
// var fallar = 3;

// function muestraEstado(){

//     if(envenenado == true) {
//         console.log('envenenado');
//     }

//     if(quemado == true){
//         console.log('quemado');
//     }
// }

// function juegaTurno(){

//     var jugadaCPU = Math.floor(Math.random() * 4)
//     console.log('Tu numero aleatorio es: ' + jugadaCPU);

//     if (jugadaCPU == atacar) {
//         console.log('He atacado al jugador');
//     }
//     if (jugadaCPU == quemar) {
//         quemado = true;
//         console.log('He quemado al jugador');
//     }
//     if (jugadaCPU == envenenar) {
//         envenenado = true;
//         console.log('He envenenado al jugador');
//     }
//     if (jugadaCPU == fallar) {
//         console.log('He fallado al atacar al jugador');
//     }

//     muestraEstado();
// }

var fps = 10;
var xEscenario = 0;

function atacar () {
    console.log('Estas atacando a tu enemigo!!!');
}




function mueveEscenario() {
    xEscenario ++;
    console.log(xEscenario);
}


function principal() {
    mueveEscenario();
}

setInterval(principal, 1000 / fps);
