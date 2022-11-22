criterios = ["Sin ordenar", "Ascendente por precio", "Descendente por precio"];

function creaListaCriterios() {
  const selectElement = document.querySelector("#criteriosOrdenacion").value;
  return pintaArticulos(selectElement);
}

function pintaArticulos(orden) {
  let articulos = listaArticulos;

  if (orden === "Sin ordenar") {
    articulos = listaArticulos;
  }

  if (orden === "Ascendente por precio") {
    articulos = [...listaArticulos].sort((a, b) => {
      return a.precio - b.precio;
    });
  }

  if (orden === "Descendente por precio") {
    articulos = [...listaArticulos].sort((a, b) => {
      return b.precio - a.precio;
    });
  }

  let contenedor = document.querySelector("#contenedor");

  contenedor.innerHTML = articulos
    .map((articulo) => {
      return (
        '<div class="card text-center"><img src="../assets/' +
        articulo.codigo +
        '.jpg" class="card-img-top"/><div class="card-body"><h5 class="card-title">' +
        articulo.nombre +
        '</h5><p class="card-text"> ' +
        articulo.descripcion +
        '</p> <p class= "font-weight-bold">' +
        articulo.precio +
        "€" +
        `</p><button class="btn btn-primary compra" id="${articulo.codigo}">Comprar</button></div></div>`
      );
    })
    .join("");

  let botones = document.getElementsByClassName("compra");

  Array.from(botones).forEach((element) => {
    element.addEventListener("click", () => ponArticuloEnCarrito(element.id));
  });
}

function ponArticuloEnCarrito(codigo) {
  carrito.anyadeArticulo(codigo);
}

function verCarro() {
  document.querySelector("#btnEfectuaPedido").disabled = false;
  carrito.verCarrito();
  document.getElementById("miDialogo").showModal();
  document.body.style = "opacity:0.3;";
}

function seguirComprando() {
  document.getElementById("miDialogo").close();
  document.body.style = "opacity:1;";
}

function efectuaPedido() {
  if (carrito.articulosCarrito.length == 0) {
    document.querySelector("#btnEfectuaPedido").disabled = true;
    dialogContent.innerHTML = "<p>¡Debe introducir un articulo.!</p>";
  } else {
    document.querySelector("#btnEfectuaPedido").disabled = false;
    document.getElementById("miDialogo").close();
    document.body.style = "opacity:1;";
    console.log(JSON.stringify(carrito.articulosCarrito.map((a) => a)));
    console.log(
      "El total del pedido es: ",
      document.getElementById("total").innerHTML
    );
    carrito.articulosCarrito.splice(carrito.length);
    agradecimiento();
  }
}

function agradecimiento() {
  document.getElementById("miDialogo2").showModal();
  document.body.style = "opacity:0.3;";
}

function agradecimientoSi() {
  document.getElementById("miDialogo2").close();
  document.getElementById("miDialogo4").showModal();
  document.body.style = "opacity:0.3;";
}

function agradecimientoNo() {
  document.getElementById("miDialogo3").showModal();
  document.body.style = "opacity:0.3;";
}

function agradecimientoGato() {
  document.getElementById("miDialogo2").close();
  document.getElementById("miDialogo3").close();
  document.getElementById("miDialogo4").showModal();
  document.body.style = "opacity:0.3;";
}

function salir() {
  document.getElementById("miDialogo4").close();
  document.body.style = "opacity:1;";
}

function generarId() {
  let max = 9999;
  let min = 1;
  let num = Math.random() * (max - min) + min;
  return Math.floor(num);
}

window.onload = () => {
  carrito = new Carrito(generarId());
  cargarOpciones();
  pintaArticulos();
};

function cargarOpciones() {
  const optionList = document.querySelector("#criteriosOrdenacion");
  criterios.forEach((option) => optionList.add(new Option(option)));
}
