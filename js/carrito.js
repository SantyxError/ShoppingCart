class Carrito {
  id;
  articulosCarrito;

  constructor(id) {
    this.id = id;
    this.articulosCarrito = [
      {
        codigo: "m1",
        nombre: "Galaxy A32",
        descripcion: "4GB + 128GB libre",
        precio: 229,
        unidades: 1,
      },
    ];
  }

  buscaArticulo(id) {
    return this.articulosCarrito.find((a) => a.codigo == id);
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
    const articulo = this.buscaArticulo(id);
  }

  modificaUnidades(id, modificador) {
    //busqueda de articulo por id
    const articulo = this.articulosCarrito.find((a) => a.codigo == id);

    // nuestro modificador admitirá "suma" o "resta"
    if (modificador == "+") {
      console.log("metodo modificador");
      articulo.unidades += 1;
    } else if (modificador == "-") {
      console.log("resta");
    } else {
      console.log("ninguno");
    }
  }

  contadorUnidades(articulo) {
    const contador = this.articulosCarrito.filter((a) => {
      return a.codigo === articulo.codigo;
    });
    return contador.length;
  }

  verCarrito() {}
}

//Esto es para borrar un objeto según su posición en el array :D
// if (index) { // only splice array when item is found
//   array.splice(index, 1); // 2nd parameter means remove one item only
// }
