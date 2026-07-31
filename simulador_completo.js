
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  function ocultarSecciones() {
    document.getElementById("parametros").classList.remove("activa");
    document.getElementById("clientes").classList.remove("activa");

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

function guardarCliente(){
    let cedula=recuperaraTexto("txtCedula");
    let nombre=recuperaraTexto("txtNombre");
    let apellido=recuperaraTexto("txtApellido");
    let ingresos=recuperarFloat("txtIngresos");
    let egresos=recuperarFloat("txtEgresos");
    let cliente={
        cedula:cedula,
        nombre:nombre,
        apellido:apellido,
        ingresos:ingresos,
        egresos:egresos
    };
    clientes.push(cliente);
    pintarClientes();
    limpiar();

}

function pintarClientes(){
    let contenido="";
    let cliente;
    for(let i=0;i<clientes.length;i++){
        cliente=clientes[i];
        contenido+=`
        <tr>

            <td>${cliente.cedula}</td>
            <td>${cliente.nombre}</td>
            <td>${cliente.apellido}</td>
            <td>${cliente.ingresos}</td>
            <td>${cliente.egresos}</td>

            <td>

            <button
            onclick="seleccionarCliente('${cliente.cedula}')">
            Actualizar
            </button>

            </td>

        </tr>
        `;

    }
    document.getElementById("tablaClientes").innerHTML=contenido;

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
    if(clienteSeleccionado==null){
    }else{
        clienteSeleccionado.nombre=recuperaraTexto("txtNombre");
        clienteSeleccionado.apellido=recuperaraTexto("txtApellido");
        clienteSeleccionado.ingresos=recuperarFloat("txtIngresos");
        clienteSeleccionado.egresos=recuperarFloat("txtEgresos");
        clienteSeleccionado=null;
    }
    pintarClientes();
    limpiar();

}
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios