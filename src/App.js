import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";

import Header from "./components/Header";
import Productos from "./components/Productos";
import EditarProducto from "./components/EditarProducto";
import AgregarProducto from "./components/AgregarProducto";
import Producto from "./components/Producto";

function App() {
  const [productos, guardarProductos] = useState([]);
  const [recargarProductos, guardarRecargarProductos] = useState(true);

  useEffect(() => {
    if (recargarProductos) {
      const consultarApi = async () => {
        // consultar la api de json-server
        const resultado = await axios.get("http://localhost:4000/restaurant");

        guardarProductos(resultado.data);
      };

      consultarApi();

      // cambiar a false la recargar de productos
      guardarRecargarProductos(false);
    }
  }, [recargarProductos]);

  return (
    <Router>
      <Header />
      <main className="container mt-5">
        <Switch>
          <Route
            exact
            path="/productos"
            render={() => <Productos guardarRecargarProductos={guardarRecargarProductos} productos={productos} />}
          />
          <Route
            exact
            path="/nuevo-producto"
            render={() => (
              <AgregarProducto
                guardarRecargarProductos={guardarRecargarProductos}
              />
            )}
          />
          <Route exact path="/productos/:id" component={Producto} />
          <Route
            exact
            path="/productos/editar/:id"
            render={props =>{
              // tomar el ID del producto
              const idProducto = parseInt(props.match.params.id);

              // el producto que se pasa al state
              const producto = productos.filter(producto => producto.id === idProducto);

              return(
                <EditarProducto guardarRecargarProductos={guardarRecargarProductos} producto={producto[0]}/>
                )
            }}
          />
        </Switch>
      </main>
      <p className="mt-4 p2 text-center">Todos los derechos reservados</p>
    </Router>
  );
}

export default App;
