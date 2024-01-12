var configTeclado = { revent_repeat: true};

var eventoTeclado  = new window.keypress.Listener(this, configTeclado);


function pulsaA(){
    console.log('has pulsado a');
}

function pulsaAB(){
    console.log('has pulsado a y b a la ves');
}

function ataqueEspecial(){
    console.log('has desbloqueado el ataque especial!!!');
}







eventoTeclado.simple_combo('a', pulsaA)
eventoTeclado.simple_combo('a b', pulsaAB)
eventoTeclado.sequence_combo('up down a b', ataqueEspecial)