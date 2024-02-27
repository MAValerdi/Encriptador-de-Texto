
const cTextoEncriptar = document.querySelector(".texto-encriptar");
const varAlerta = document.querySelector(".texto-alerta");
const cBotEncriptar = document.querySelector(".boton-encriptar");
const varBotDesEncriptar = document.querySelector(".boton-desencriptar")
const varTextoSalida = document.querySelector(".texto-salida");
const varTarjetaContenedor = document.querySelector(".tarjeta-contenedor");
const cBotCopiar = document.querySelector(".boton-copiar");


const matrizRemplazo = [
    ["e", "enter"],
    ["i", "imes" ],
    ["a", "ai" ],
    ["o", "ober"],
    ["u", "ufat"],
];


//pongo el foco en el texto a encriptar
cTextoEncriptar.focus();


//actualiza el texto de alerta para el usuairo
cTextoEncriptar.addEventListener("input", updateValue);

function updateValue() {
    console.log(cTextoEncriptar.value + " texto a encripar dentro de upadatevalue");
    varAlerta.style.color = "#495057";
    varAlerta.textContent = "Solo letras minúsculas y sin acentos";
}


// funcion encriptar

cBotEncriptar.addEventListener("click", encriptando);

function encriptando() {

    let textoAEncriptar = cTextoEncriptar.value;

    cajatexto = cTextoEncriptar.value;
    
    //si no se ha pasado ningun texto se sale de la función
    if (cajatexto.length <= 0 ) {
        cTextoEncriptar.focus();
        return cajatexto = "";
    }
    
    //verifica si hay Mayusculas
    if (encuetraMayusculas(cajatexto) == false){
        return;
    }
        
    //verifica si hay caracteres especiales
    if (encuetraEspeciales(cajatexto) == false){
        return;
    };
    


    //inicia la encripcion
    for (let i = 0; i < matrizRemplazo.length; i++){
        if (cajatexto.includes(matrizRemplazo[i][0])) {
            cajatexto = cajatexto.replaceAll(
                matrizRemplazo[i][0],
                matrizRemplazo[i][1]
            );
        }
    };

    //oculto muñeco y textos
    varTarjetaContenedor.style.visibility = "hidden";
    cBotCopiar.style.visibility = "inherit";

    //pongo el texto en la caja de salida
    varTextoSalida.value = cajatexto;

    //pongo el foco en el bóton copiar
    cBotCopiar.focus();


    return cajatexto;
    
}



//al hacer click en el boton copiar
cBotCopiar.addEventListener("click", copiarTexto);
function copiarTexto(campoTexto) {

    /* Seleccionar el texto */    
    varTextoSalida.select();
    varTextoSalida.setSelectionRange(0, 99999); /* Para dispositivos móviles */
    
    /* Copiar el texto al portapapeles */
    document.execCommand("copy");

};




//funcion desencriptar

varBotDesEncriptar.addEventListener("click", desEncriptando);

function desEncriptando(cajatexto) {
    cajatexto = cTextoEncriptar.value;
    
    //si no se ha pasado ningun texto se sale de la función
    if (cajatexto.length <= 0 ) {
        cTextoEncriptar.focus();
        return cajatexto = "";
    }
    
    //verifica si hay Mayusculas
    if (encuetraMayusculas(cajatexto) == false){
        return;
    }
        
    //verifica si hay caracteres especiales
    if (encuetraEspeciales(cajatexto) == false){
        return;
    };


    //inicia la DesEncripcion
    for (let i = matrizRemplazo.length -1 ; i >= 0; i--){
        if (cajatexto.includes(matrizRemplazo[i][1])) {
            cajatexto = cajatexto.replaceAll(
                matrizRemplazo[i][1],
                matrizRemplazo[i][0]
            );
        }
    };

    //oculto muñeco y textos
    varTarjetaContenedor.style.visibility = "hidden";
    cBotCopiar.style.visibility = "inherit";

    //pongo el texto en la caja de salida
    varTextoSalida.value = cajatexto;

    //pongo el foco en el bóton copiar
    cBotCopiar.focus();
    

    return cajatexto;
    
}


function encuetraEspeciales(cajatexto) {
 
    //caracteres Especiales
    let caracteresEspeciales = /[ªº\·$€&Ç+,:;=?¿@#|'<>.^*()%-_{}"¡'`¨áéíóúü]/g;
    let encontroEspeciales = [];

    if (caracteresEspeciales.test(cajatexto)) {
        
        encontroEspeciales = encontroEspeciales.concat(cajatexto.match(caracteresEspeciales));
        
        if (encontroEspeciales.length > 0) {
            varAlerta.style.color = "#ff0000";
            varAlerta.textContent = "No se permiten caracteres especiales, Intente de nuevo por favor!";
            cTextoEncriptar.focus();
            cajatexto = "";
            return false;
        }
    } 
    
}


function encuetraMayusculas(cajatexto) {
    
    //Mayusculas
    let caracteresMayusculas = /[A-Z]/g;
    let encontroMayusculas = [];
    
    if(caracteresMayusculas.test(cajatexto)) {
        
        encontroMayusculas = encontroMayusculas.concat(cajatexto.match(caracteresMayusculas));

        if (encontroMayusculas.length > 0) {
            console.log("Tiene Mayusculas");
            varAlerta.style.color = "#ff0000";
            varAlerta.textContent = "No se permiten Mayusculas, Intente de nuevo por favor!";
            cTextoEncriptar.focus();
            cajatexto = "";
            return false;
        }
    }


}
