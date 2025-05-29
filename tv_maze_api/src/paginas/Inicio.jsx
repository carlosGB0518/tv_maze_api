import { useEffect, useState } from 'react';
import MenuPrincipal from '../componentes/MenuPrincipal';
import BuscadorSeries from '../componentes/BuscadorSeries';
import ListaSeries from '../componentes/ListaSeries';
import { buscarSeriesPorNombre, obtenerSeriesPopulares } from '../servicios/apiTvMaze';
import BotonSorpresa from '../componentes/BotonSorpresa';

function Inicio() {
  const [series, setSeries] = useState([]);
  const [todasSeries, setTodasSeries] = useState([]);
  const [generoSeleccionado, setGeneroSeleccionado] = useState('');

  useEffect(() => {
    async function cargarSeries() {
      const resultados = await obtenerSeriesPopulares(); // llamamos las populares
      setTodasSeries(resultados);
      setSeries(resultados);
    }
    cargarSeries();
  }, []);

  const buscar = async (nombre) => {
    if (nombre.trim().length > 0) {
      const resultados = await buscarSeriesPorNombre(nombre);
      setSeries(resultados);
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
    <div>
      <MenuPrincipal />
      <h1>Explorar Series</h1>
      <BuscadorSeries onBuscar={buscar} />

      <label htmlFor="filtro-genero">Filtrar por género: </label>
      <select id="filtro-genero" value={generoSeleccionado} onChange={filtrarPorGenero}>
        <option value="">Todos</option>
        <option value="Drama">Drama</option>
        <option value="Comedy">Comedy</option>
        <option value="Thriller">Thriller</option>
        <option value="Action">Action</option>
        <option value="Science-Fiction">Science-Fiction</option>
        <option value="Romance">Romance</option>
      </select>

      <ListaSeries series={series} />
      <BotonSorpresa />
    </div>
  );
}

export default Inicio;
