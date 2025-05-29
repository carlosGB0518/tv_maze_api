import { useFavoritos } from '../hooks/useFavoritos';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Favoritos() {
  const { favoritos, eliminarFavorito } = useFavoritos();
  const [generoSeleccionado, setGeneroSeleccionado] = useState('');

  const manejarCambioGenero = (e) => {
    setGeneroSeleccionado(e.target.value);
  };

  const favoritosFiltrados = generoSeleccionado
    ? favoritos.filter((serie) =>
        serie.generos?.includes(generoSeleccionado)
      )
    : favoritos;

  return (
    <div>
      <h2>Mis Series Favoritas</h2>

      <label htmlFor="filtro-genero">Filtrar por género:</label>
      <select
        id="filtro-genero"
        value={generoSeleccionado}
        onChange={manejarCambioGenero}
        style={{ marginLeft: '0.5rem', marginBottom: '1rem' }}
      >
        <option value="">Todos</option>
        <option value="Drama">Drama</option>
        <option value="Comedy">Comedy</option>
        <option value="Science-Fiction">Science-Fiction</option>
        <option value="Thriller">Thriller</option>
        <option value="Action">Action</option>
        <option value="Horror">Horror</option>
      </select>

      {favoritosFiltrados.length === 0 ? (
        <p>No tienes series favoritas para este filtro.</p>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '1rem',
            padding: '1rem',
          }}
        >
          {favoritosFiltrados.map((serie) => (
            <div
              key={serie.serie_id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '10px',
              }}
            >
              <Link to={`/serie/${serie.serie_id}`}>
                <img
                  src={serie.imagen_url}
                  alt={serie.nombre}
                  style={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '4px',
                  }}
                />
                <h4 style={{ marginTop: '0.5rem' }}>{serie.nombre}</h4>
              </Link>
              <button onClick={() => eliminarFavorito(serie.serie_id)}>
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favoritos;
