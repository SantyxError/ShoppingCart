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
  const modal = document.querySelector("#miDialogo");
  modal.style.top = "140px";
  modal.style.display = "block";

  const dialogContent = document.querySelector("#dialogContent");

  dialogContent.innerHTML = `<table class='table'>
  <thead>
    <tr>
      <th scope="col"> * </th>
      <th scope="col"> Nombre </th>
      <th scope="col"> Descripción </th>
      <th scope="col"> Precio </th>
      <th scope="col"> Unidades </th>
      <th scope="col"> Total </th>
      <th scope="col"> Acciones </th>
    </tr>
    </thead> 
    <tbody>
      ${carrito.articulosCarrito
        .map((articulo) => {
          return `<tr>
                    <td><img src="../assets/${
                      articulo.codigo
                    }.jpg" width="50"/></td>
                    <td>${articulo.nombre}</td>
                    <td>${articulo.descripcion}</td>
                    <td>${articulo.precio}€</td>
                    <td>${carrito.contadorUnidades(articulo)}</td>
                    <td>total</td>
                    <td>
                      <button type="button" class="btn btn-primary" onclick="${carrito.modificaUnidades(
                        articulo.codigo,
                        "+"
                      )}">+</button>
                      <button type="button" class="btn btn-warning">-</button>
                      <button type="button" class="btn btn-danger">Borrar</button>
                    </td>
                  </tr>`;
        })
        .join("")}
    </tbody>
  </table>
  `;
}

function seguirComprando() {
  const modal = document.querySelector("#miDialogo");
  modal.style.display = "none";
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
