import React, {useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';


function App() {
  
  //state de la app
  const [busqueda, guardarBusqueda] = useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(5)

  useEffect(() => {
    const consultarApi = async () => {
      if(busqueda === '') return;
    
      const imagenesPorPagina = 30;
      const key = '22829590-e62a9a9262823d4baadad0134'
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`
      
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarImagenes(resultado.hits);
      console.log(resultado)
      //calculat total de paginas
      const calcularTotalPaginas= Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas)
      const textuppercase = document.querySelector('.text-uppercase');
      textuppercase.scrollIntoView({behavior: 'smooth'});
    }
    consultarApi();
    
  }, [busqueda, paginaActual]);
  //definir lar pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1;
    if(nuevaPaginaActual === 0) return
    
    guardarPaginaActual(nuevaPaginaActual)
  }
  //definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1;
    
    if(nuevaPaginaActual > totalPaginas) return;
    
    guardarPaginaActual(nuevaPaginaActual);
  }
  
  return (
    <div className="container">
      <div  className="text-uppercase">
        <div className="text-center">
          <h1 className="display-1"  >Buscador de Imagenes</h1>
        </div>
        <Formulario 
          guardarBusqueda={guardarBusqueda}
        />
      </div>
        <div className="row justify-content-center">
            <ListadoImagenes 
              imagenes={imagenes}
            />
            
            {(paginaActual === 1) ? null : (
              <div  className="d-grid gap-2 d-md-block">
              <button type="button"
                    className="btn btn-info mr-1"
                    onClick={paginaAnterior}
              >&laquo; Anterior 
              </button>
              </div> 
            )}
           
            {(paginaActual === totalPaginas) ? null : (
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="button"
                    className="btn btn-info "
                    onClick={paginaSiguiente}
              >Siguiente &raquo;
              </button>
              </div>
            )}
            

        </div>
    </div>
  );
}

export default App;
