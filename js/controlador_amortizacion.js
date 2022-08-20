/*Variables de los distintos valores del formulario */
let dolar = 24.06; 
function calcularBTN(){
    let monto = document.getElementById('monto');
    let moneda = document.getElementById('moneda');
    let tiempo = document.getElementById('tiempo');
    let tipoTiempo = document.getElementById('tipoTiempo');
    let interes = document.getElementById('interes');
    let amortizacion = document.getElementById('amortizacion');
    let validate = document.getElementById('validate');
    if (monto.value === '' || tiempo.value === '' || interes.value === '') {
        validate.style.display="block";
    } else {
        validate.style.display="none";
        if (amortizacion.value =="frances"){
            calcularamortizacionFrancesa(monto.value,moneda.value, interes.value, tiempo.value, tipoTiempo.value);
        }else{
            calcularAmortizacionAlemana(monto.value,moneda.value, interes.value, tiempo.value, tipoTiempo.value);
        }
    }
}

function calcularamortizacionFrancesa(monto,moneda, interes, tiempo, tipoTiempo){
    let llenarTabla = document.querySelector('#lista-tabla tbody');
        console.log("Moneda: " + monto);
        console.log("monedad: " + moneda);
        console.log("interes: " + interes);
        console.log("tiempo: " + tiempo);
        console.log("tipo tiempo: " + tipoTiempo);
        
        while(llenarTabla.firstChild){
            llenarTabla.removeChild(llenarTabla.firstChild);
        }

        let fechas = [];
        let fechaActual = Date.now();
        let mes_actual = moment(fechaActual);
        let anio_actual = moment(fechaActual);
        mes_actual.add(1, 'month');    
        anio_actual.add(1,"year");


        let pagoInteres=0, pagoCapital = 0, cuota = 0;

        //converion a moneda 
        if (moneda =="dolar"){
            monto = monto / dolar;
        }

        if (tipoTiempo =="anios"){
            cuota = monto * (Math.pow(1+interes/1200, tiempo*12)*interes/1200)/(Math.pow(1+interes/1200, tiempo*12)-1);

        } else{
            cuota = monto * (Math.pow(1+interes/1200, tiempo)*interes/1200)/(Math.pow(1+interes/1200, tiempo)-1);
        }
        
 

        for(let i = 1; i <= tiempo; i++) {

            if (tipoTiempo =="anios"){
                pagoInteres = parseFloat(monto*(interes/1200))*12;
                pagoCapital = (cuota*12 - pagoInteres);
                monto = parseFloat(monto-pagoCapital);
                console.log("");
                console.log("cuota mensual: " + cuota);
                console.log("cuota anual: " + cuota*12);
                console.log("pagoInteres: " + pagoInteres);
                console.log("pagoCapital: " + pagoCapital);
                console.log("monto: " + monto);
                console.log("");

                fechas[i] = anio_actual.format('DD-MM-YYYY');
                anio_actual.add(1, 'year');

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${fechas[i]}</td>
                    <td>${(cuota*12).toFixed(2)}</td>
                    <td>${(pagoCapital).toFixed(2)}</td>
                    <td>${(pagoInteres).toFixed(2)}</td>
                    <td>${(monto).toFixed(2)}</td>
                `;
                llenarTabla.appendChild(row);

            } else{
                pagoInteres = parseFloat(monto*(interes/1200));
                pagoCapital = cuota - pagoInteres;
                monto = parseFloat(monto-pagoCapital);

                //Formato fechas
                fechas[i] = mes_actual.format('DD-MM-YYYY');
                mes_actual.add(1, 'month');

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${fechas[i]}</td>
                    <td>${cuota.toFixed(2)}</td>
                    <td>${pagoCapital.toFixed(2)}</td>
                    <td>${pagoInteres.toFixed(2)}</td>
                    <td>${monto.toFixed(2)}</td>
                `;
                llenarTabla.appendChild(row);
            }

        }
}


function calcularAmortizacionAlemana(monto,moneda, interes, tiempo, tipoTiempo) {
    let llenarTabla = document.querySelector('#lista-tabla tbody');
    console.log("Moneda: " + monto);
    console.log("monedad: " + moneda);
    console.log("interes: " + interes);
    console.log("tiempo: " + tiempo);
    console.log("tipo tiempo: " + tipoTiempo);

    while(llenarTabla.firstChild){
        llenarTabla.removeChild(llenarTabla.firstChild);
    }


    let fechas = [];
    let fechaActual = Date.now();
    let mes_actual = moment(fechaActual);
    let anio_actual = moment(fechaActual);
    mes_actual.add(1, 'month');    
    anio_actual.add(1,"year");
    let amortizacionConstante=0, pagoInteres=0, cuota=0;

        //converion a moneda 
        if (moneda =="dolar"){
            monto = monto / dolar;
        }

        if (tipoTiempo =="anios"){
            amortizacionConstante = (monto / tiempo)/12;
        }else{
            amortizacionConstante = monto / tiempo;
        }
 

    for (let i = 1; i <= tiempo; i++) {
 
        if (tipoTiempo =="anios"){
                pagoInteres = parseFloat(monto*(interes/1200));
                fechas[i] = anio_actual.format('DD-MM-YYYY');
                anio_actual.add(1, 'year');
                cuota = amortizacionConstante*12 + pagoInteres*12;
                monto = monto - amortizacionConstante*12;
                console.log(" " );
                console.log("amortizacionConstante: " + amortizacionConstante);
                console.log("pagoInteres: " + pagoInteres);
                console.log("cuota: " + cuota);
                console.log("monto: " + monto);
                
        } else{
                pagoInteres = parseFloat(monto*(interes/1200));
                fechas[i] = mes_actual.format('DD-MM-YYYY');
                mes_actual.add(1, 'month');
                cuota = amortizacionConstante + pagoInteres;
                monto = monto - amortizacionConstante;
        }

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${fechas[i]}</td>
            <td>${cuota.toFixed(2)}</td>
            <td>${amortizacionConstante.toFixed(2)}</td>
            <td>${pagoInteres.toFixed(2)}</td>
            <td>${monto.toFixed(2)}</td>
        `;
        llenarTabla.appendChild(row);
    }
}

/* Funcion para limpiar los text  , restablecer la tabla */
function limpiar() {
    document.getElementById("miForm").reset();
    calcularamortizacionFrancesa();
    calcularAmortizacionAlemana();

  }


function graficos(fechas,cuota, amortizacionConstante, pagoInteres, monto){
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['cuota','amortizacionConstante','pagoInteres','monto'],
            datasets: [{
                label: '$ruta',
                data: [$cuota,$amortizacionConstante,$pagoInteres,$monto],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    

}