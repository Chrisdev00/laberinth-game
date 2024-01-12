document.addEventListener('keydown', function (tecla) {

    //console.log(tecla.keyCode);    Permite imprimir el numero codigo de cada tecla que se presiona

    if (tecla.keyCode == 32){
        console.log('espacio');
    }

    if (tecla.keyCode == 38){
        console.log('arriba');
    }

})