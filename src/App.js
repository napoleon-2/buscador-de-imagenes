import React from 'react';
import Formulario from './components/Formulario';

function App() {
  return (
    <div className="container">
      <div  className="text-uppercase">
        <div className="text-center">
          <h1 className="display-1"  >Buscador de Imagenes</h1>
        </div>
        <Formulario />
      </div>
    </div>
  );
}

export default App;
