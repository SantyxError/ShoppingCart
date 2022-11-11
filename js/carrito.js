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

  anyadeArticulo(articulo) {
    const { codigo, nombre, descripcion, precio } = articulo;
    const articuloEncontrado = this.buscaArticulo(articulo.codigo);

    if (!articuloEncontrado) {
      this.articulosCarrito.push({
        codigo,
        nombre,
        descripcion,
        precio,
        unidades: 1,
      });
    } else {
      this.modificaUnidades(articulo.codigo, "suma");
    }
  }

  borraArticulo(id) {
    const articulo = this.buscaIndiceArticulo(id);
    console.log(articulo);
    this.articulosCarrito.splice(articulo, 1);
    this.verCarrito();
  }

  modificaUnidades(id, modificador) {
    //busqueda de articulo por id
    const articulo = this.articulosCarrito.find((a) => a.codigo == id);

    // nuestro modificador admitirá "suma" o "resta"
    if (modificador == "+") {
      articulo.unidades += 1;
      console.log("suma: " + articulo.unidades);
      this.verCarrito();
    } else if (modificador == "-") {
      articulo.unidades > 1 ? (articulo.unidades -= 1) : 1;
      console.log("resta: " + articulo.unidades);
      this.verCarrito();
    } else {
      console.log("ninguno");
    }
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
                        <button type="button" class="btn btn-primary" onclick="carrito.modificaUnidades('${
                          articulo.codigo
                        }','+')">+</button>
                        <button type="button" class="btn btn-warning" onclick="carrito.modificaUnidades('${
                          articulo.codigo
                        }','-')">-</button>
                        <button type="button" class="btn btn-danger" onclick="carrito.borraArticulo('${
                          articulo.codigo
                        }','-')">Borrar</button>
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
  }
}
