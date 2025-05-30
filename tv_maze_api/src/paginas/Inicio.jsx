import { useEffect, useState } from 'react';
import MenuPrincipal from '../componentes/MenuPrincipal';
import BuscadorSeries from '../componentes/BuscadorSeries';
import ListaSeries from '../componentes/ListaSeries';
import { buscarSeriesPorNombre, obtenerSeriesPopulares } from '../servicios/apiTvMaze';
import BotonSorpresa from '../componentes/BotonSorpresa';
import './Inicio.css';

function Inicio() {
  const [series, setSeries] = useState([]);
  const [todasSeries, setTodasSeries] = useState([]);
  const [generoSeleccionado, setGeneroSeleccionado] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarSeries() {
      setCargando(true);
      const resultados = await obtenerSeriesPopulares();
      setTodasSeries(resultados);
      setSeries(resultados);
      setCargando(false);
    }
    cargarSeries();
  }, []);

  const buscar = async (nombre) => {
    if (nombre.trim().length > 0) {
      setCargando(true);
      const resultados = await buscarSeriesPorNombre(nombre);
      setSeries(resultados);
      setCargando(false);
    } else {
      setSeries(todasSeries);
    }
  };

  const filtrarPorGenero = (e) => {
    const genero = e.target.value;
    setGeneroSeleccionado(genero);

    if (genero === '') {
      setSeries(todasSeries);
    } else {
      const filtradas = todasSeries.filter((serie) =>
        serie.genres.includes(genero)
      );
      setSeries(filtradas);
    }
  };

  return (
    <div className="inicio-container">
      <MenuPrincipal />
      
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Explora el Mundo de las <span className="highlight">Series</span>
          </h1>
          <p className="hero-subtitle">
            Descubre miles de series increíbles y encuentra tu próxima obsesión
          </p>
        </div>
        <div className="hero-gradient"></div>
      </div>

      <div className="content-wrapper">
        <div className="search-section">
          <BuscadorSeries onBuscar={buscar} />
          
          <div className="filter-section">
            <label htmlFor="filtro-genero" className="filter-label">
              <span className="filter-icon">🎭</span>
              Filtrar por género:
            </label>
            <select 
              id="filtro-genero" 
              value={generoSeleccionado} 
              onChange={filtrarPorGenero}
              className="filter-select"
            >
              <option value="">Todos los géneros</option>
              <option value="Drama">🎪 Drama</option>
              <option value="Comedy">😄 Comedy</option>
              <option value="Thriller">😱 Thriller</option>
              <option value="Action">💥 Action</option>
              <option value="Science-Fiction">🚀 Science-Fiction</option>
              <option value="Romance">💕 Romance</option>
            </select>
          </div>
        </div>

        {cargando ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Cargando series...</p>
          </div>
        ) : (
          <div className="series-section">
            <div className="section-header">
              <h2 className="section-title">
                {generoSeleccionado ? `Series de ${generoSeleccionado}` : 'Series Populares'}
              </h2>
              <div className="results-count">
                {series.length} {series.length === 1 ? 'serie encontrada' : 'series encontradas'}
              </div>
            </div>
            <ListaSeries series={series} />
          </div>
        )}

        <div className="surprise-section">
          <BotonSorpresa />
        </div>
      </div>
    </div>
  );
}

export default Inicio;