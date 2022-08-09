const targets = document.querySelectorAll('[data-target]')
const content = document.querySelectorAll('[data-content]')

const distancias = [
    {
        "distancia":91.1,
        "precio":50
    },
    {
        "distancia":251,
        "precio":150,
    },
    {
        "distancia":125,
        "precio":100
    },
    {
        "distancia":207.9,
        "precio":143
    },
    {
        "distancia":310.9,
        "precio":175
    },
    {
        "distancia":235.9,
        "precio":150
    },
    {
        "distancia":141.2,
        "precio":100
    },
    {
        "distancia":401.6,
        "precio":300
    },
    {
        "distancia":411.1,
        "precio":300
    },
    {
        "distancia":94.3,
        "precio":80
    }
]
const PrecioC=121.4
const RendimientoC=6.45
function calcularGastos(){
    const idRuta = parseInt(document.getElementById('ruta').value)
    if(idRuta!=-1){
        const ruta = distancias[idRuta].distancia
        const costo = distancias[idRuta].precio
        const GV = ((ruta/RendimientoC)*PrecioC)
        document.getElementById('GV').innerHTML=GV;
        document.getElementById('TG').innerHTML= GV+300;
        document.getElementById('precio').innerHTML=costo;
        const IPC= parseInt(document.getElementById('primeraclase').value)*costo*1.5;
        const ICN= parseInt(document.getElementById('normal').value)*costo;
        const ICE= parseInt(document.getElementById('niños').value)*costo*0.5;
        const TI= parseInt(document.getElementById('terceraedad').value)*costo*0.4;
        document.getElementById('IPC').innerHTML=IPC;
        document.getElementById('ICN').innerHTML=ICN;
        document.getElementById('ICE').innerHTML=ICE;
        document.getElementById('TI').innerHTML=TI;
        document.getElementById('BT').innerHTML=IPC+ICN+ICE+TI;
    }
}
targets.forEach (target => {
    target.addEventListener ('click', () => {
        content.forEach(c => {
            c.classList.remove('active')
            c.classList.remove('enviar')
        })


        const t = document.querySelector (target.dataset.target)
        t.classList.add('active')
        t.classList.add('enviar')
    })
})

