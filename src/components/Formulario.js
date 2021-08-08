import React, {useState, } from 'react';
import Error from './Error';

const Formulario = ({guardarBusqueda}) => {
    const [termino, guardarTermino] = useState('');
    const [error, guardarError] = useState(false);

    const buscarImagenes = e => {
        e.preventDefault();
        //validar
        if(termino.trim() === '') { 
            guardarError(true);
            return;
        }
        guardarError(false);
        //enviar el termino de busqueda hacia el componente principal
        guardarBusqueda(termino);
    }
    return ( 
        <form onSubmit={buscarImagenes}>
            <div className="row justify-content-center">
                <div className="col-lg">
                <input className="form-control form-control-lg" 
                       type="text" 
                       placeholder="Buscador de imagenes, ejemplo: cafe o personas" 
                       aria-label=".form-control-lg example"
                       onChange={e => guardarTermino(e.target.value)}
                       />
                </div>
                <div className="col-auto ">
                <input className="btn btn-success btn-lg" 
                       type="submit" 
                       value="Buscar"
                       />
                </div>
                
            </div>
            {error ? <Error mensaje="Agregar un termino de busqueda" /> : null}
        </form>
     );
}
 
export default Formulario;