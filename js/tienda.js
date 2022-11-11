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
        `</p><a a href="#" class="btn btn-primary" onclick="ponArticuloEnCarrito(${JSON.stringify(
          articulo
        )
          .split('"')
          .join("&quot;")})"">Comprar</a></div></div>`
      );
    })
    .join("");
}

function ponArticuloEnCarrito(articulo) {
  carrito.anyadeArticulo(articulo);
}

function verCarro() {
  carrito.verCarrito();
  document.getElementById("miDialogo").showModal();
  document.body.style = "opacity:0.3;";
}

function seguirComprando() {
  document.getElementById("miDialogo").close();
  document.body.style = "opacity:1;";
}

function efectuaPedido() {}

window.onload = () => {
  carrito = new Carrito(1234);
  cargarOpciones();
  pintaArticulos();
};

function cargarOpciones() {
  const optionList = document.querySelector("#criteriosOrdenacion");

  criterios.forEach((option) => optionList.add(new Option(option)));
}
