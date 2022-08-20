var Riesgo 
var Perfil 
var capital
const fecha = Date.now();
const fecha_actual = new Date(fecha);

function perfilInversor () {

    let TI = document.querySelector("input[name='TI']:checked").value 
    let CI = document.querySelector("input[name='CI']:checked").value 
    let OI = document.querySelector("input[name='OI']:checked").value 
    let EXP = document.querySelector("input[name='EXP']:checked").value 


    Riesgo = (parseInt(TI) + parseInt(CI) + parseInt(OI)) / parseInt(EXP)
    //Riesgo = EXP
    document.getElementById('Riesgo').innerHTML = Riesgo

    if (Riesgo < 3) {
        Perfil = 1
        document.getElementById('Riesgo').innerHTML = "Su perfil es de nivel: " + Perfil + ' "Bajo riesgo"' 
        + " <abbr title='En base a su experiencia y pretenciones \n el sistema le asignara un alto % de su capital para invertir' ><img id='ayuda' style='height:15px;' src='./img/18436.png'></abbr>"
        document.getElementById('Perfil').style.display = "block"
    } else if (Riesgo >= 3 && Riesgo <= 6) {
        Perfil = 2
        document.getElementById('Riesgo').innerHTML = "Su perfil es de nivel: " + Perfil +' "Riesgo medio"'
        + " <abbr title='En base a su experiencia y pretenciones \n el sistema le asignara un % medio de su capital para invertir \n ademas de restringir ciertos productos ' ><img id='ayuda' style='height:15px;' src='./img/18436.png'></abbr>"
        document.getElementById('Perfil').style.display = "block"
    } else {
        Perfil = 3
        document.getElementById('Riesgo').innerHTML = "Su perfil es de nivel: " + Perfil + ' "Alto riesgo"'
        + " <abbr title='En base a su experiencia y pretenciones \n el sistema le asignara un % bajo de su capital para invertir \n ademas de restringir ciertos productos ' ><img id='ayuda' style='height:15px;' src='./img/18436.png'></abbr>"
        document.getElementById('Perfil').style.display = "block"
    }

    document.getElementById('capital').disabled = false
    document.getElementById('Asignar').disabled = false

    if (Perfil == 3){

        document.getElementById('capital').setAttribute("min", 100)
        document.getElementById('capital').setAttribute("max", 1000)

    } else if (Perfil == 2) {
        document.getElementById('capital').setAttribute("min", 1000)
        document.getElementById('capital').setAttribute("max", 10000)
    } else {
        document.getElementById('capital').setAttribute("min", 10000)
        document.getElementById('capital').setAttribute("max", 100000)
    }
}

var capital_asignado 
function capitalAsignado () {


    switch (Perfil) {
        case 1:
            capital = document.getElementById('capital').value
            capital_asignado = capital * 0.9
            document.getElementById('monto_asignado').innerHTML = 
            "Se le ha asignado un total de: " + capital_asignado + "L  para su inversion (90% de su capital)"
            break;
        case 2:
            capital = document.getElementById('capital').value
            capital_asignado = capital * 0.6
            document.getElementById('monto_asignado').innerHTML = 
            "Se le ha asignado un total de: " + capital_asignado + "L  para su inversion (60% de su capital)"
            break;
        case 3:
            capital = document.getElementById('capital').value
            capital_asignado = capital * 0.3
            document.getElementById('monto_asignado').innerHTML = 
            "Se le ha asignado un total de: " + capital_asignado + "L  para su inversion (30% de su capital)"
            break;
        default:
            break;
    }
    document.getElementById('siguiente').disabled= false
}

function crearDatos () {

    document.getElementById('Asignar').addEventListener("click", crear)


    function crear () {
        sessionStorage.setItem("Perfil_usuario", Perfil)
        sessionStorage.setItem("Capital_asignado",capital_asignado )
    }



    /*
    if(Perfil == 1){
        document.getElementById('I1').disabled= false
        document.getElementById('I2').disabled= false
        document.getElementById('I3').disabled= false
    }
    else if (Perfil == 2) {
        document.getElementById('I3').disabled= false
        document.getElementById('I2').disabled= false
    } else {
        document.getElementById('I3').disabled= false
    }*/
}


function tipoInversion () {
    let Tipo_perfil = sessionStorage.getItem("Perfil_usuario")

    if(Tipo_perfil == 1){
        document.getElementById('I1').disabled = false
        document.getElementById('I2').disabled = false
        document.getElementById('I3').disabled = false
    }
    else if (Tipo_perfil == 2) {
        document.getElementById('I3').disabled = false
        document.getElementById('I2').disabled = false
    } else {
        document.getElementById('I3').disabled= false
    }

}

var precio_BTC_entrada

var endpoint ='https://api.binance.com/api/v3/ticker/price'
    fetch(endpoint)
        .then(response => response.json())
        .then(data => mostrar(data))
        .catch(e => console.log(e))


        const mostrar = (data)=> {
            precio_BTC_entrada = data[11].price * 24.5
            console.log(data[11])
            /*let body = ''
            body += `<h4>${data[1].price}</h4>`*/
           
        }


function actualizar (){
    var endpoint ='https://api.binance.com/api/v3/ticker/price'
    fetch(endpoint)
        .then(response => response.json())
        .then(data => actualizar1(data))

        const actualizar1 = (data)=> {
            let precio_BTC_actual = data[11].price * 24.5
            let porcentaje = ((precio_BTC_actual * 100) / precio_BTC_entrada)
            let cambio =  porcentaje - 100
            let pred22 = 38063.850 * 24.5
            let pred23 = 33217.918 * 24.5
            let pred24 = 52791.140 * 24.5
            let pred25 = 67282.151 * 24.5
            let monto = sessionStorage.getItem("Capital_asignado")
            let valor = monto * (porcentaje/100)
            let diferencia = valor - monto
            document.getElementById('valor').innerHTML = valor.toFixed(4) + " L"
            document.getElementById('cambio').innerHTML = cambio.toFixed(4) + " %"
            document.getElementById('diferencia').innerHTML = diferencia.toFixed(2) + " L"

            document.getElementById('2022').innerHTML =  (parseInt(monto) + parseInt((((monto * pred22) / precio_BTC_entrada) * (porcentaje/100)))).toFixed(2)
            + " <b><i>'Diferencia'</i></b> " + (((monto * pred22) / precio_BTC_entrada ) * (porcentaje/100)).toFixed(2)
            document.getElementById('2023').innerHTML =  (parseInt(monto) + parseInt((((monto * pred23) / precio_BTC_entrada) * (porcentaje/100)))).toFixed(2)
            + " <b><i>'Diferencia'</i></b> " + (((monto * pred23) / precio_BTC_entrada ) * (porcentaje/100)).toFixed(2)
            document.getElementById('2024').innerHTML =  (parseInt(monto) + parseInt((((monto * pred24) / precio_BTC_entrada) * (porcentaje/100)))).toFixed(2)
            + " <b><i>'Diferencia'</i></b> " + (((monto * pred24) / precio_BTC_entrada ) * (porcentaje/100)).toFixed(2)
            document.getElementById('2025').innerHTML =  (parseInt(monto) + parseInt((((monto * pred25) / precio_BTC_entrada) * (porcentaje/100)))).toFixed(2)
            + " <b><i>'Diferencia'</i></b> " + (((monto * pred25) / precio_BTC_entrada ) * (porcentaje/100)).toFixed(2)
        }

}
        

function eleccion (){

    let cap = sessionStorage.getItem("Capital_asignado")
    let eleccion = document.querySelector("input[name='eleccion']:checked").value 

    document.getElementById("IE").innerHTML = "Usted eligio invertir " + '"' +cap + " L"+ '"' + " en " + eleccion ;
    inversionActual();
    
    setInterval (() => {
        actualizar();
    }, 2000);

 
}

setInterval (() => {
    if(document.getElementById('I1').checked){
        document.getElementById('grafica-btc').style.display = 'block'
    } else {
        document.getElementById('grafica-btc').style.display = 'none'
    }
    if(document.getElementById('I2').checked){
        document.getElementById('grafica-usd').style.display = 'block'
    } else {
        document.getElementById('grafica-usd').style.display = 'none'
    }
    if(document.getElementById('I3').checked){
        document.getElementById('grafica-petroleo').style.display = 'block'
    } else {
        document.getElementById('grafica-petroleo').style.display = 'none'
    }
}, 1500);



function inversionActual () {
    let ci = sessionStorage.getItem("Capital_asignado")

    document.getElementById("Capitalinvertido").innerHTML = ci
    document.getElementById("fecha").innerHTML = fecha_actual.toLocaleDateString()
}


function asignarInversion (){
    perfilInversor();
    crearDatos();
    
}