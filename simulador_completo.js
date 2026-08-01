  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

function ocultarSecciones(){

document.getElementById("parametros")
.classList.remove("activa");


document.getElementById("clientes")
.classList.remove("activa");


document.getElementById("creditos")
.classList.remove("activa");


document.getElementById("historial")
.classList.remove("activa");


}

function mostrarSeccion(id){
    ocultarSecciones();
    document.getElementById(id).classList.add("activa");
}

function guardarTasa(){
    let tasa = recuperarInt("tasaInteres");
    if(tasa>=10 && tasa<=20){
        tasaInteres=tasa;
        mostrarTexto(
            "mensajeTasa",
            "Tasa configurada correctamente: "+tasa+"%"
        );
    }else{
        mostrarTexto(
            "mensajeTasa",
            "La tasa debe estar entre 10% y 20%"
        );
    }
}


function pintarClientes(){

    let contenido = "";

    for(let i = 0; i < clientes.length; i++){

        let cliente = clientes[i];

        contenido += `
        <tr>
            <td>${cliente.cedula}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.apellido}</td>
            <td>${cliente.ingresos}</td>
            <td>${cliente.egresos}</td>
            <td>
                <button onclick="seleccionarCliente('${cliente.cedula}')">
                    Actualizar
                </button>
            </td>
        </tr>
        `;
    }

    document.getElementById("tablaClientes").innerHTML = contenido;
}

function buscarCliente(cedula){
    let cliente;
    for(let i=0;i<clientes.length;i++){
        cliente=clientes[i];
        if(cliente.cedula==cedula){
            return cliente;
        }
    }
    return null;
}

function buscarClienteCredito(){

    let cedula =
    recuperaraTexto("cedulaCredito");


    let cliente =
    buscarCliente(cedula);


    if(cliente != null){


        document.getElementById(
            "datosClienteCredito"
        ).innerHTML = `

        <h3>Datos del Cliente</h3>

        <p>
        <strong>Cédula:</strong>
        ${cliente.cedula}
        </p>

        <p>
        <strong>Nombre:</strong>
        ${cliente.nombre}
        </p>

        <p>
        <strong>Apellido:</strong>
        ${cliente.apellido}
        </p>

        <p>
        <strong>Ingresos:</strong>
        ${cliente.ingresos}
        </p>

        <p>
        <strong>Egresos:</strong>
        ${cliente.egresos}
        </p>

        `;


    }else{


        document.getElementById(
            "datosClienteCredito"
        ).innerHTML =

        "Cliente no encontrado";


    }

}

function seleccionarCliente(cedula){
    clienteSeleccionado=buscarCliente(cedula);
    mostrarTextoEnCaja(
        "txtCedula",
        clienteSeleccionado.cedula
    );
    mostrarTextoEnCaja(
        "txtNombre",
        clienteSeleccionado.nombre
    );
    mostrarTextoEnCaja(
        "txtApellido",
        clienteSeleccionado.apellido
    );
    mostrarTextoEnCaja(
        "txtIngresos",
        clienteSeleccionado.ingresos
    );
    mostrarTextoEnCaja(
        "txtEgresos",
        clienteSeleccionado.egresos
    );
}
  
function guardarCliente(){

    if(clienteSeleccionado == null){

        let cliente = {
            cedula: recuperaraTexto("txtCedula"),
            nombre: recuperaraTexto("txtNombre"),
            apellido: recuperaraTexto("txtApellido"),
            ingresos: recuperarFloat("txtIngresos"),
            egresos: recuperarFloat("txtEgresos")
        };

        clientes.push(cliente);

    }else{

        clienteSeleccionado.nombre = recuperaraTexto("txtNombre");
        clienteSeleccionado.apellido = recuperaraTexto("txtApellido");
        clienteSeleccionado.ingresos = recuperarFloat("txtIngresos");
        clienteSeleccionado.egresos = recuperarFloat("txtEgresos");

        clienteSeleccionado = null;
    }

    pintarClientes();
    limpiar();
}

function calcularCredito(){


let cedula =
recuperaraTexto("cedulaCredito");


let cliente = buscarCliente(cedula);

clienteSeleccionado = cliente;



if(cliente==null){

mostrarTexto(
"resultadoCredito",
"Primero busque un cliente"
);

return;

}



let monto =
recuperarFloat("montoCredito");


let plazo =
recuperarInt("plazoCredito");



let capacidadPago =
cliente.ingresos - cliente.egresos;



let interes =
calcularInteresSimple(
monto,
tasaInteres,
plazo
);



let totalPagar =
monto + interes;



let cuota =
totalPagar /
(plazo*12);




let resultado;



if(cuota <= capacidadPago){

resultado="APROBADO";


}else{

resultado="RECHAZADO";

}



let caja =
document.getElementById(
"resultadoCredito"
);



caja.innerHTML=`

Capacidad de pago:
${capacidadPago}
<br>

Total a pagar:
${totalPagar}
<br>

Cuota mensual:
${cuota.toFixed(2)}

<br>

RESULTADO:
${resultado}

`;



if(resultado=="APROBADO"){

    creditoAprobado = true;

    caja.className="aprobado";

    document.getElementById("btnAsignarCredito").disabled = false;

}else{

    creditoAprobado = false;

    caja.className="rechazado";

    document.getElementById("btnAsignarCredito").disabled = true;

}

montoCalculado = monto;
plazoCalculado = plazo;
cuotaCalculada = cuota;


}

function asignarCredito(){

    if(!creditoAprobado){
        alert("El crédito no está aprobado.");
        return;
    }

    let credito = {

        cedula: clienteSeleccionado.cedula,
        nombre: clienteSeleccionado.nombre,
        apellido: clienteSeleccionado.apellido,
        monto: montoCalculado,
        tasa: tasaInteres,
        plazo: plazoCalculado,
        cuota: cuotaCalculada

    };

    creditos.push(credito);

    alert("Crédito asignado correctamente");

    document.getElementById("btnAsignarCredito").disabled = true;

    creditoAprobado = false;

}

function limpiar(){
    mostrarTextoEnCaja("txtCedula","");
    mostrarTextoEnCaja("txtNombre","");
    mostrarTextoEnCaja("txtApellido","");
    mostrarTextoEnCaja("txtIngresos","");
    mostrarTextoEnCaja("txtEgresos","");
    clienteSeleccionado=null;
}

function calcularInteresSimple(monto,tasa,plazo){
return monto *
(tasa/100) *
plazo;
}

function buscarCreditos(cedula){


let encontrados=[];


for(let i=0;i<creditos.length;i++){


if(creditos[i].cedula==cedula){

encontrados.push(
creditos[i]
);

}


}


return encontrados;


}

function pintarCreditos(lista){


let contenido="";


for(let i=0;i<lista.length;i++){


let credito=lista[i];


contenido+=`

<tr>

<td>${credito.cedula}</td>

<td>${credito.nombre}</td>

<td>${credito.apellido}</td>

<td>${credito.monto}</td>

<td>${credito.tasa}%</td>

<td>${credito.plazo}</td>

<td>${credito.cuota.toFixed(2)}</td>


</tr>


`;

}



document.getElementById(
"tablaCreditos"
).innerHTML=contenido;



}

function buscarCreditosCliente(){

    let cedula = recuperaraTexto("cedulaHistorial");

    if(cedula==""){

        pintarCreditos(creditos);

        return;

    }

    let resultado = buscarCreditos(cedula);

    pintarCreditos(resultado);

}