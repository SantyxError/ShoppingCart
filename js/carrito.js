class Carrito {
  id;
  articulosCarrito;

  constructor(id) {
    this.id = id;
    this.articulosCarrito = [];
  }

  buscaArticulo(id) {
    return this.articulosCarrito.find((a) => a.codigo == id);
  }

  buscaIndiceArticulo(id) {
    return this.articulosCarrito.findIndex((a) => a.codigo == id);
  }

  anyadeArticulo(codigo) {
    let articuloEncontrado = this.buscaArticulo(codigo);
    let articuloTienda = listaArticulos.find((a) => a.codigo == codigo);

    if (!articuloEncontrado) {
      this.articulosCarrito.push({
        codigo: articuloTienda.codigo,
        nombre: articuloTienda.nombre,
        descripcion: articuloTienda.descripcion,
        precio: articuloTienda.precio,
        unidades: 1,
      });
    } else {
      articuloEncontrado.unidades += 1;
    }
  }

  borraArticulo(id) {
    const articulo = this.buscaIndiceArticulo(id);
    this.articulosCarrito.splice(articulo, 1);
    this.verCarrito();
  }

  modificaUnidades(id, modificador) {
    //busqueda de articulo por id
    const articulo = this.articulosCarrito.find((a) => a.codigo == id);

    // nuestro modificador admitirá "suma" o "resta"
    if (modificador == "+") {
      articulo.unidades += 1;
    } else if (modificador == "-") {
      articulo.unidades > 1 ? (articulo.unidades -= 1) : 1;
    } else if (modificador == "") {
      this.borraArticulo(id);
    }
    this.verCarrito();
  }

  verCarrito() {
    const dialogContent = document.querySelector("#dialogContent");
    let total = 0;

    if (carrito.articulosCarrito.length == 0) {
      dialogContent.innerHTML = "<p>El carrito está vacío</p>";
    } else {
      dialogContent.innerHTML = `<table class='table'>
    <thead>
      <tr>
        <th scope="col"> IMG </th>
        <th scope="col"> Nombre </th>
        <th scope="col"> Descripción </th>
        <th scope="col"> Precio </th>
        <th scope="col"> Unidades </th>
        <th scope="col"> Total </th>
        <th scope="col"> </th>
      </tr>
      </thead> 
      <tbody>
        ${carrito.articulosCarrito
          .map((articulo) => {
            total += articulo.precio * articulo.unidades;

            return `<tr>
                      <td><img src="../assets/${
                        articulo.codigo
                      }.jpg" width="50"/></td>
                      <td>${articulo.nombre}</td>
                      <td>${articulo.descripcion}</td>
                      <td>${articulo.precio}€</td>
                      <td>${articulo.unidades}</td>
                      <td>${articulo.precio * articulo.unidades}€</td>
                      <td>
                        <button type="button"  id="${
                          articulo.codigo
                        }" value="+" class="btn btn-primary modificado">+</button>
                        <button type="button" id="${
                          articulo.codigo
                        }" value="-" class="btn btn-warning modificado">-</button>
                        <button type="button" id="${
                          articulo.codigo
                        }"  class="btn btn-danger modificado">Borrar</button>
                      </td>
                    </tr>`;
          })
          .join("")}
      </tbody>
    </table>
    `;
    }

    document.getElementById("total").innerHTML = total + "€";
    document.getElementById("idPedido").innerHTML = this.id;

    let arrayBoton = document.getElementsByClassName("modificado");
    Array.from(arrayBoton).forEach((element) => {
      element.addEventListener("click", () =>
        this.modificaUnidades(element.id, element.value)
      );
    });
  }
}
