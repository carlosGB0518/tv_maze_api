import { useEffect, useState } from 'react';
import MenuPrincipal from '../componentes/MenuPrincipal';
import BuscadorSeries from '../componentes/BuscadorSeries';
import ListaSeries from '../componentes/ListaSeries';
import { buscarSeriesPorNombre } from '../servicios/apiTvMaze';

function Inicio() {
  const [series, setSeries] = useState([]);
  const [seriesOriginales, setSeriesOriginales] = useState([]);
  const [filtroGenero, setFiltroGenero] = useState('');

  useEffect(() => {
    // Cargar una lista inicial de series
    async function cargarSeriesIniciales() {
      const resultados = await buscarSeriesPorNombre('a');
      setSeries(resultados);
      setSeriesOriginales(resultados);
    }

    cargarSeriesIniciales();
  }, []);

  const buscar = async (nombre) => {
    if (nombre.trim().length > 0) {
      const resultados = await buscarSeriesPorNombre(nombre);
      setSeries(resultados);
      setSeriesOriginales(resultados);
      setFiltroGenero(''); // Reiniciar filtro
    }
  };

  const filtrarPorGenero = (genero) => {
    setFiltroGenero(genero);
    if (genero === '') {
      setSeries(seriesOriginales);
    } else {
      const filtradas = seriesOriginales.filter((serie) =>
        serie.genres.includes(genero)
      );
      setSeries(filtradas);
    }
  };

  return (
    <div>
      <MenuPrincipal />
      <h1>Explorar Series</h1>
      <BuscadorSeries onBuscar={buscar} />

      <div>
        <label>Filtrar por género: </label>
        <select value={filtroGenero} onChange={(e) => filtrarPorGenero(e.target.value)}>
          <option value="">Todos</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedia</option>
          <option value="Action">Acción</option>
          <option value="Science-Fiction">Ciencia Ficción</option>
          <option value="Horror">Terror</option>
        </select>
      </div>

      <ListaSeries series={series} />
    </div>
  );
}

export default Inicio;
